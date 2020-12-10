const fakeRequest = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const { testOwner, updatedTestOwner, testDogs } = require('./testJSON.js')

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
            .send(testDogs[0]);

        expect(response.body).toEqual(testDogs[0]);
    })

    it('tests .post /dog, returns testDog2', async () => {
        const response = await fakeRequest(app)
            .post('/dog')
            .send(testDogs[1]);

        expect(response.body).toEqual(testDogs[1]);
    })

    it('tests .post /dog, returns testDog3', async () => {
        const response = await fakeRequest(app)
            .post('/dog')
            .send(testDogs[2]);

        expect(response.body).toEqual(testDogs[2]);
    })

    it('tests .get /dog, returns [testDogs]', async () => {
        const response = await fakeRequest(app)
            .get('/dog');

        expect(response.body).toEqual(testDogs);
    });

    // it('tests .post /dog, returns testDog', async () => {
    //     const { body } = await Promise.all(
    //         testDogs.map(dog =>
    //             fakeRequest(app)
    //                 .post('/dog')
    //                 .send(dog)));

    //     console.log(body)
    //     expect(testDogs).toEqual(expect.arrayContaining(response));
    // })


});