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

const updatedTestOwner = {
    id: '1',
    owner_name: 'Paul',
    age: 40,
    bald: false
}

const testDog = {
    id: '1',
    dog_name: 'Paco',
    breed: 'Chihuahua',
    dog_age: 6,
    owner_id: '1'
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

    it('tests .put /owner, returns updatedTestOwner', async () => {
        const response = await fakeRequest(app)
            .put(`/owner/${updatedTestOwner.id}`)
            .send(updatedTestOwner);

        expect(response.body).toEqual(updatedTestOwner);
    });

    it('tests .delete /owner, returns updatedTestOwner', async () => {
        const response = await fakeRequest(app)
            .delete(`/owner/${updatedTestOwner.id}`)

        expect(response.body).toEqual(updatedTestOwner);
    })
});

describe('tests Dog class', () => {
    beforeAll(async () => {
        await pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
        await fakeRequest(app)
            .post('/owner')
            .send(testOwner);
    });
    afterAll(async () => {
        await pool.end();
    })

    it('tests .post /dog, returns testDog', async () => {
        const response = await fakeRequest(app)
            .post('/dog')
            .send(testDog);

        expect(response.body).toEqual(testDog);
    })

});