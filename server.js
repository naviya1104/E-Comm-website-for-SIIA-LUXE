const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Schemas and Models
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    type: String, // 'topGlam' or 'products'
});
const Product = mongoose.model('Product', productSchema);

const ourStorySchema = new mongoose.Schema({
    text: String,
});
const OurStory = mongoose.model('OurStory', ourStorySchema);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// API to get content data
app.get('/api/content', async (req, res) => {
    try {
        const topGlam = await Product.find({ type: 'topGlam' });
        const products = await Product.find({ type: 'products' });
        const ourStoryDoc = await OurStory.findOne();
        const ourStory = ourStoryDoc ? ourStoryDoc.text : '';
        res.json({ topGlam, products, ourStory });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch content data' });
    }
});

// API to update "Our Story" content
app.post('/api/ourStory', async (req, res) => {
    const { text } = req.body;
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid text' });
    }
    try {
        let ourStoryDoc = await OurStory.findOne();
        if (!ourStoryDoc) {
            ourStoryDoc = new OurStory({ text });
        } else {
            ourStoryDoc.text = text;
        }
        await ourStoryDoc.save();
        res.json({ message: 'Our Story updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Our Story' });
    }
});

app.post('/api/upload/:type', upload.single('image'), async (req, res) => {
    const type = req.params.type;
    if (!['slideshow', 'topGlam', 'products'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const { name, price } = req.body;
    if ((type === 'topGlam' || type === 'products') && (!name || !price)) {
        return res.status(400).json({ error: 'Name and price are required for products' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    try {
        if (type === 'slideshow') {
            // For simplicity, store slideshow images in a separate collection or handle differently if needed
            // Here, just respond success without DB storage
            res.json({ message: 'Image uploaded', url: imageUrl });
        } else {
            const product = new Product({
                name,
                price: parseFloat(price),
                image: imageUrl,
                type,
            });
            await product.save();
            res.json({ message: 'Image uploaded', url: imageUrl });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to save product' });
    }
});

// API to delete image by URL
app.delete('/api/image', async (req, res) => {
    const { url, type } = req.body;
    console.log('Delete request received:', { url, type });
    if (!url || !type || !['slideshow', 'topGlam', 'products'].includes(type)) {
        console.log('Invalid parameters:', { url, type });
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        if (type === 'slideshow') {
            // Handle slideshow image deletion if stored in DB
            res.json({ message: 'Image deleted' });
        } else {
            let product = await Product.findOne({ image: url, type });
            if (!product) {
                // Try without leading slash if not found
                const altUrl = url.startsWith('/') ? url.substring(1) : '/' + url;
                product = await Product.findOne({ image: altUrl, type });
            }
            if (!product) {
                console.log('Image not found in DB:', url);
                return res.status(404).json({ error: 'Image not found' });
            }
            console.log('Deleting product:', product);
            await Product.deleteOne({ _id: product._id });
            // Delete file from uploads folder
            const filePath = path.join(__dirname, url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            res.json({ message: 'Image deleted' });
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});

async function migrateData() {
    const contentFile = path.join(__dirname, 'contentData.json');
    if (fs.existsSync(contentFile)) {
        const data = JSON.parse(fs.readFileSync(contentFile));
        // Migrate topGlam
        if (Array.isArray(data.topGlam)) {
            for (const item of data.topGlam) {
                const exists = await Product.findOne({ name: item.name, type: 'topGlam' });
                if (!exists) {
                    const product = new Product({
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        type: 'topGlam',
                    });
                    await product.save();
                }
            }
        }
        // Migrate products
        if (Array.isArray(data.products)) {
            for (const item of data.products) {
                const exists = await Product.findOne({ name: item.name, type: 'products' });
                if (!exists) {
                    const product = new Product({
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        type: 'products',
                    });
                    await product.save();
                }
            }
        }
        // Migrate ourStory
        if (data.ourStory) {
            let ourStoryDoc = await OurStory.findOne();
            if (!ourStoryDoc) {
                ourStoryDoc = new OurStory({ text: data.ourStory });
                await ourStoryDoc.save();
            }
        }
        console.log('Data migration completed');
    }
}

migrateData().then(() => {
    app.use(express.static(__dirname));  // Serve static files from root directory
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Data migration failed:', err);
    app.use(express.static(__dirname));  // Serve static files from root directory
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
