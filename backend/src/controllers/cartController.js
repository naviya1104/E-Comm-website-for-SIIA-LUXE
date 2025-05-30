const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const items = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }],
    });
    res.json({ cart, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    const { quantity } = req.body;
    cartItem.quantity = quantity || cartItem.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
