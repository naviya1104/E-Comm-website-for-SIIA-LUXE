const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');
const Product = require('../../src/models/Product');
const Cart = require('../../src/models/Cart');
const CartItem = require('../../src/models/CartItem');
const Category = require('../../src/models/category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, fullName: 'Test User', email: 'testuser@example.com', passwordHash: 'hashedpassword' });
  await Category.create({ id: 1, name: 'Necklaces', description: 'Necklace category' });
  await Product.create({ id: 1, name: 'Test Product', description: 'A product for testing', price: 99.99, image: 'http://example.com/image.jpg', categoryId: 1, stockQuantity: 10 });
  await Cart.create({ id: 1, userId: 1 });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Cart API', () => {
  test('Add item to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .send({ userId: 1, productId: 1, quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(2);
  });

  test('Get cart items for user', async () => {
    const res = await request(app)
      .get('/api/cart/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Update cart item quantity', async () => {
    const res = await request(app)
      .put('/api/cart/1')
      .send({ quantity: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(3);
  });

  test('Remove item from cart', async () => {
    const res = await request(app)
      .delete('/api/cart/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Cart item removed');
  });
});
