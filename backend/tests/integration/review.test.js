const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const User = require('../../src/models/User');
const Product = require('../../src/models/Product');
const Review = require('../../src/models/Review');
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

describe('Review API', () => {
  const reviewData = {
    userId: 1,
    productId: 1,
    rating: 5,
    comment: 'Excellent product!',
  };

  test('Create a new review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send(reviewData);
    expect(res.statusCode).toBe(201);
    expect(res.body.comment).toBe(reviewData.comment);
  });

  test('Get all reviews', async () => {
    const res = await request(app)
      .get('/api/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get review by ID', async () => {
    const res = await request(app)
      .get('/api/reviews/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.comment).toBe(reviewData.comment);
  });

  test('Update review', async () => {
    const res = await request(app)
      .put('/api/reviews/1')
      .send({ rating: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(4);
  });

  test('Delete review', async () => {
    const res = await request(app)
      .delete('/api/reviews/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Review deleted');
  });

  test('Get non-existent review returns 404', async () => {
    const res = await request(app)
      .get('/api/reviews/999');
    expect(res.statusCode).toBe(404);
  });
});
