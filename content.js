if (typeof window.apiBase === 'undefined') {
    window.apiBase = 'http://127.0.0.1:3001/api';
}

async function loadContentImages() {
    try {
        const res = await fetch(window.apiBase + '/content');
        const data = await res.json();

        const topGlamContainer = document.getElementById('containerTopGlam');
        topGlamContainer.innerHTML = '';
        data.topGlam.forEach(product => {
            const box = document.createElement('div');
            box.className = 'box';

            const img = document.createElement('img');
            img.src = 'http://127.0.0.1:3001' + product.image;
            box.appendChild(img);

            const details = document.createElement('div');
            details.className = 'details';

            const name = document.createElement('h3');
            name.textContent = product.name;
            details.appendChild(name);

            const price = document.createElement('h4');
            price.textContent = '₹' + product.price.toFixed(2);
            details.appendChild(price);

            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.onclick = () => addToCart(product._id);
            details.appendChild(addToCartBtn);

            box.appendChild(details);

            topGlamContainer.appendChild(box);
        });

        const productsContainer = document.getElementById('containerProducts');
        productsContainer.innerHTML = '';
        data.products.forEach(product => {
            const box = document.createElement('div');
            box.className = 'box';

            const img = document.createElement('img');
            img.src = 'http://127.0.0.1:3001' + product.image;
            img.style.width = '160px';
            img.style.height = '160px';
            img.style.borderRadius = '0';
            box.appendChild(img);

            const details = document.createElement('div');
            details.className = 'details';

            const name = document.createElement('h3');
            name.textContent = product.name;
            details.appendChild(name);

            const price = document.createElement('h4');
            price.textContent = '₹' + product.price.toFixed(2);
            details.appendChild(price);

            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.onclick = () => addToCart(product._id);
            details.appendChild(addToCartBtn);

            box.appendChild(details);

            productsContainer.appendChild(box);
        });
    } catch (error) {
        console.error('Failed to load content images:', error);
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    console.log('Cart:', cart);
}

loadContentImages();
