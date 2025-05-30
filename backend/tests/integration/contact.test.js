const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const ContactMessage = require('../../src/models/ContactMessage');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Contact API', () => {
  const contactData = {
    name: 'Test User',
    email: 'testuser@example.com',
    message: 'This is a test message',
  };

  test('Create a new contact message', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send(contactData);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(contactData.email);
  });

  test('Get all contact messages', async () => {
    const res = await request(app)
      .get('/api/contact');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get contact message by ID', async () => {
    const res = await request(app)
      .get('/api/contact/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(contactData.email);
  });

  test('Delete contact message', async () => {
    const res = await request(app)
      .delete('/api/contact/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Contact message deleted');
  });

  test('Get non-existent contact message returns 404', async () => {
    const res = await request(app)
      .get('/api/contact/999');
    expect(res.statusCode).toBe(404);
  });
});
