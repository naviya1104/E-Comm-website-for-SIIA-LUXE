const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const Product = require('../../src/models/Product');
const Category = require('../../src/models/category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Category.create({ id: 1, name: 'Necklaces', description: 'Necklace category' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product API', () => {
  const productData = {
    name: 'Test Product',
    description: 'A product for testing',
    price: 99.99,
    image: 'http://example.com/image.jpg',
    categoryId: 1,
    stockQuantity: 10,
  };

  test('Create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send(productData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(productData.name);
  });

  test('Get all products', async () => {
    const res = await request(app)
      .get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get product by ID', async () => {
    const res = await request(app)
      .get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(productData.name);
  });

  test('Update product', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .send({ price: 79.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(79.99);
  });

  test('Delete product', async () => {
    const res = await request(app)
      .delete('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');
  });

  test('Get non-existent product returns 404', async () => {
    const res = await request(app)
      .get('/api/products/999');
    expect(res.statusCode).toBe(404);
  });
});
