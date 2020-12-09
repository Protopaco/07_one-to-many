const fakeRequest = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');


describe('tests server listener', () => {
    it('tests /test endpoint', async () => {
        const response = await fakeRequest(app).get('/test');

        expect(response.body).toEqual({ greeting: 'TESTING TESTING TESTING' });
    });
})