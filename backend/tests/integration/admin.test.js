const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, fullName: 'Admin User', email: 'admin@example.com', passwordHash: 'hashedpassword', isAdmin: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Admin API', () => {
  test('Get all users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', 'Bearer admin-token'); // Replace with actual token logic
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Delete a user', async () => {
    const res = await request(app)
      .delete('/api/admin/users/1')
      .set('Authorization', 'Bearer admin-token'); // Replace with actual token logic
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });
});
