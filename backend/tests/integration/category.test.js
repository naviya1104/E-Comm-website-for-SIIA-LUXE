const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const Category = require('../../src/models/category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Category API', () => {
  const categoryData = {
    name: 'Test Category',
    description: 'Category for testing',
  };

  test('Create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send(categoryData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(categoryData.name);
  });

  test('Get all categories', async () => {
    const res = await request(app)
      .get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get category by ID', async () => {
    const res = await request(app)
      .get('/api/categories/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(categoryData.name);
  });

  test('Update category', async () => {
    const res = await request(app)
      .put('/api/categories/1')
      .send({ description: 'Updated description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  test('Delete category', async () => {
    const res = await request(app)
      .delete('/api/categories/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Category deleted');
  });

  test('Get non-existent category returns 404', async () => {
    const res = await request(app)
      .get('/api/categories/999');
    expect(res.statusCode).toBe(404);
  });
});
