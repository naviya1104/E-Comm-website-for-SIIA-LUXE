const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const SlideImage = require('../../src/models/SlideImage');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Slideshow API', () => {
  const slideData = {
    title: 'Test Slide',
    imageUrl: 'http://example.com/slide.jpg',
    description: 'Slide description',
  };

  test('Create a new slide image', async () => {
    const res = await request(app)
      .post('/api/slides')
      .send(slideData);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(slideData.title);
  });

  test('Get all slide images', async () => {
    const res = await request(app)
      .get('/api/slides');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get slide image by ID', async () => {
    const res = await request(app)
      .get('/api/slides/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(slideData.title);
  });

  test('Update slide image', async () => {
    const res = await request(app)
      .put('/api/slides/1')
      .send({ description: 'Updated description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  test('Delete slide image', async () => {
    const res = await request(app)
      .delete('/api/slides/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Slide image deleted');
  });

  test('Get non-existent slide image returns 404', async () => {
    const res = await request(app)
      .get('/api/slides/999');
    expect(res.statusCode).toBe(404);
  });
});
