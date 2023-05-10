const request = require('supertest');
const express = require('express');
const app = require('./server');

describe('API endpoints', () => {
  it('should return search results', async () => {
    const response = await request(app)
      .get('/api/search?term=example&media=music')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.results).toBeDefined();
    expect(Array.isArray(response.body.results)).toBeTruthy();
  });

});
