require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Medium = require('../lib/models/Medium');

describe('test for MEDIUM schema and routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let testMedium = null;
  beforeEach(async() => {
    testMedium = JSON.parse(JSON.stringify(await Medium.create({
      name: 'Screen Print',
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create and POST a medium', () => {
    return request(app)
      .post('/api/v1/mediums')
      .send({
        name: 'oil painting',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'oil painting',
          __v: 0,
        });
      });
  });

  it('can GET all the MEDIUMS', async() => {
    const mediums = await Medium.create([
      { name: 'oil painting' },
      { name: 'marble sculpture' },
      { name: 'acrylic painting' },
    ]);

    return request(app)
      .get('/api/v1/mediums')
      .then(res => {
        const mediumsJSON = JSON.parse(JSON.stringify(mediums));
        mediumsJSON.forEach(medium => {
          expect(res.body).toContainEqual({
            _id: medium._id,
            name: medium.name
          });
        });
      });
  });

  it('cen GET by ID a single MEDIUM', () => {
    return request(app)
      .get(`/api/v1/mediums/${testMedium._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Screen Print',
          __v: 0,
        });
      });
  });

  it('can update with PUT a MEDIUM', () => {
    return request(app)
      .put(`/api/v1/mediums/${testMedium._id}`)
      .send({
        name: 'Wood Block Print',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Wood Block Print',
          __v: 0
        });
      });
  });

  it('can DELETE a MEDIUM by id', () => {
    console.log(testMedium);
    return request(app)
      .delete(`/api/v1/mediums/${testMedium._id}`)
      .then(res => {
        console.log('line 96', res.body);
        expect(res.body.name).toEqual(testMedium.name);
      });
  });
  
});
