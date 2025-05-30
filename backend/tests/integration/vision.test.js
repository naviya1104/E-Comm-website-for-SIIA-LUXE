const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/database/connection');
const Vision = require('../../src/models/Vision');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Vision API', () => {
  const visionData = {
    title: 'Our Vision',
    description: 'To be the best in the industry',
  };

  test('Create a new vision', async () => {
    const res = await request(app)
      .post('/api/vision')
      .send(visionData);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(visionData.title);
  });

  test('Get all visions', async () => {
    const res = await request(app)
      .get('/api/vision');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Get vision by ID', async () => {
    const res = await request(app)
      .get('/api/vision/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(visionData.title);
  });

  test('Update vision', async () => {
    const res = await request(app)
      .put('/api/vision/1')
      .send({ description: 'Updated description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  test('Delete vision', async () => {
    const res = await request(app)
      .delete('/api/vision/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Vision deleted');
  });

  test('Get non-existent vision returns 404', async () => {
    const res = await request(app)
      .get('/api/vision/999');
    expect(res.statusCode).toBe(404);
  });
});
