const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');
const Order = require('../../src/models/Order');
const OrderItem = require('../../src/models/OrderItem');
const Product = require('../../src/models/Product');
const Category = require('../../src/models/category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, fullName: 'Test User', email: 'testuser@example.com', passwordHash: 'hashedpassword' });
  await Category.create({ id: 1, name: 'Necklaces', description: 'Necklace category' });
  await Product.create({ id: 1, name: 'Test Product', description: 'A product for testing', price: 99.99, image: 'http://example.com/image.jpg', categoryId: 1, stockQuantity: 10 });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Order API', () => {
  const orderData = {
    userId: 1,
    status: 'pending',
    totalAmount: 199.98,
    shippingAddress: '123 Test St',
    paymentMethod: 'credit_card',
    paymentStatus: 'pending',
    items: [
      { productId: 1, quantity: 2, price: 99.99 },
    ],
  };

  test('Create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send(orderData);
    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toBe(orderData.userId);
  });

  test('Get all orders', async () => {
    const res = await request(app)
      .get('/api/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get order by ID', async () => {
    const res = await request(app)
      .get('/api/orders/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBe(orderData.userId);
  });

  test('Update order', async () => {
    const res = await request(app)
      .put('/api/orders/1')
      .send({ status: 'shipped' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('shipped');
  });

  test('Delete order', async () => {
    const res = await request(app)
      .delete('/api/orders/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Order deleted');
  });

  test('Get non-existent order returns 404', async () => {
    const res = await request(app)
      .get('/api/orders/999');
    expect(res.statusCode).toBe(404);
  });
});
