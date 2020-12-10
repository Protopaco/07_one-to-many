const fakeRequest = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const { testOwner, updatedTestOwner, testDogs, updatedTestDog } = require('./testJSON.js')

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
        const response = await Promise.all(
            testDogs.map(dog =>
                fakeRequest(app)
                    .post('/dog')
                    .send(dog)));

        const responseBody = response.map(respons => { return respons.body });

        expect(responseBody).toEqual(expect.arrayContaining(testDogs));
    })


    it('tests .get /dog, returns [testDogs]', async () => {
        const response = await fakeRequest(app)
            .get('/dog');

        expect(response.body).toEqual(testDogs);
    });

    it('tests .get /owner/id, returns testOwner', async () => {
        const response = await fakeRequest(app)
            .get(`/owner/${testOwner.id}`)

        expect(response.body).toEqual({ ...testOwner, dogs: expect.arrayContaining(testDogs) });
    });

    it('tests .get /dog/id, returns testDog[0]', async () => {
        const response = await fakeRequest(app)
            .get(`/dog/${testDogs[0].id}`)

        expect(response.body).toEqual({
            owner_name: testOwner.owner_name,
            owner_bald: testOwner.bald,
            ...testDogs[0]
        })
    })

    it('tests .update /dog, returns updatedTestDog', async () => {
        const response = await fakeRequest(app)
            .put(`/dog/${updatedTestDog.id}`)
            .send(updatedTestDog)

        expect(response.body).toEqual(updatedTestDog)
    })

    it('tests .delete /dog, returns updatedTestDog', async () => {
        const response = await fakeRequest(app)
            .delete(`/dog/${updatedTestDog.id}`)

        expect(response.body).toEqual(updatedTestDog);
    })



});