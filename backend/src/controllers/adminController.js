const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/category');

exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const productCount = await Product.count();
    const orderCount = await Order.count();
    const categoryCount = await Category.count();

    res.json({
      userCount,
      productCount,
      orderCount,
      categoryCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional admin-specific controllers can be added here
