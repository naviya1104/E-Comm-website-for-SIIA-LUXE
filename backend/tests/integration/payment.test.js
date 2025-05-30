const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const Payment = require('../../src/models/Payment');
const Order = require('../../src/models/Order');
const User = require('../../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, fullName: 'Test User', email: 'testuser@example.com', passwordHash: 'hashedpassword' });
  await Order.create({ id: 1, userId: 1, status: 'pending', totalAmount: 100 });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Payment API', () => {
  const paymentData = {
    orderId: 1,
    amount: 100,
    paymentMethod: 'credit_card',
    status: 'pending',
  };

  test('Create a new payment', async () => {
    const res = await request(app)
      .post('/api/payment')
      .send(paymentData);
    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(paymentData.amount);
  });

  test('Get all payments', async () => {
    const res = await request(app)
      .get('/api/payment');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get payment by ID', async () => {
    const res = await request(app)
      .get('/api/payment/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(paymentData.amount);
  });

  test('Update payment', async () => {
    const res = await request(app)
      .put('/api/payment/1')
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  test('Delete payment', async () => {
    const res = await request(app)
      .delete('/api/payment/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Payment deleted');
  });

  test('Get non-existent payment returns 404', async () => {
    const res = await request(app)
      .get('/api/payment/999');
    expect(res.statusCode).toBe(404);
  });
});
