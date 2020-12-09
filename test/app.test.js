const fakeRequest = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');

const testOwner = {
    id: '1',
    owner_name: 'Paul',
    age: 40,
    bald: true
}

describe('tests server listener', () => {
    it('tests /test endpoint', async () => {
        const response = await fakeRequest(app).get('/test');

        expect(response.body).toEqual({ greeting: 'TESTING TESTING TESTING' });
    });
})

describe('tests Owner class', () => {
    beforeAll(async () => {
        await pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
    });

    it('tests .post /owner, returns testOwner', async () => {
        const response = await fakeRequest(app)
            .post('/owner')
            .send(testOwner);

        expect(response.body).toEqual(testOwner);
    })

    it('tests .get /owner, returns testOwner', async () => {
        const response = await fakeRequest(app)
            .get('/owner');

        expect(response.body).toEqual([testOwner]);
    })
})