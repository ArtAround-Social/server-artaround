require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('POST artwork adds to db and GCS', () => {
    const image = './test-assets/my-portrait.jpg';
    const id = mongoose.Types.ObjectId();
    console.log(id);
    return request(app)
      .post('/api/v1/files/artwork')
      .send({
        artist: id,
        file: image
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          artist: `${id}`,
          __v: 0,
          imgUrl: expect.any(String)
        });
      });
  });
});
