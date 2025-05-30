const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth API', () => {
  const userData = {
    fullName: 'Test User',
    email: 'testuser@example.com',
    password: 'Password123!',
  };

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  test('Register with existing email should fail', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  test('Login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  test('Login with incorrect password should fail', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: 'WrongPassword' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid credentials');
  });

  test('Get user profile with valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userData.email);
  });

  test('Get user profile without token should fail', async () => {
    const res = await request(app)
      .get('/api/auth/profile');
    expect(res.statusCode).toBe(401);
  });
});
