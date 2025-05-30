const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, fullName: 'Test User', email: 'testuser@example.com', passwordHash: 'hashedpassword' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  test('Get user by ID', async () => {
    const res = await request(app)
      .get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('Update user', async () => {
    const res = await request(app)
      .put('/api/users/1')
      .send({ fullName: 'Updated User' });
    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe('Updated User');
  });

  test('Delete user', async () => {
    const res = await request(app)
      .delete('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

  test('Get non-existent user returns 404', async () => {
    const res = await request(app)
      .get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
});
