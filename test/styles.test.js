require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Style = require('../lib/models/Style');

describe('test for STYLE schema and routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let testStyle = null;
  beforeEach(async() => {
    testStyle = JSON.parse(JSON.stringify(await Style.create({
      name: 'Impressionism',
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create and POST a style', () => {
    return request(app)
      .post('/api/v1/styles')
      .send({
        name: 'Futurism',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Futurism',
          __v: 0,
        });
      });
  });

  it('can GET all the STYLES', async() => {
    const styles = await Style.create([
      { name: 'Futurism' },
      { name: 'Dada' },
      { name: 'Realism' },
    ]);

    return request(app)
      .get('/api/v1/styles')
      .then(res => {
        const stylesJSON = JSON.parse(JSON.stringify(styles));
        stylesJSON.forEach(style => {
          expect(res.body).toContainEqual({
            _id: style._id,
            name: style.name
          });
        });
      });
  });

  it('cen GET by ID a single STYLE', () => {
    return request(app)
      .get(`/api/v1/styles/${testStyle._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Impressionism',
          __v: 0,
        });
      });
  });

  it('can update with PUT a STYLE', () => {
    return request(app)
      .put(`/api/v1/styles/${testStyle._id}`)
      .send({
        name: 'Expressionism',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Expressionism',
          __v: 0
        });
      });
  });

  it('can DELETE a STYLE by id', () => {
    console.log(testStyle);
    return request(app)
      .delete(`/api/v1/styles/${testStyle._id}`)
      .then(res => {
        console.log('line 96', res.body);
        expect(res.body.name).toEqual(testStyle.name);
      });
  });
});
