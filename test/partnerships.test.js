require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Gallery = require('../lib/models/Gallery');
const Medium = require('../lib/models/Medium');
const Style = require('../lib/models/Style');
const Artist = require('../lib/models/Artist');
const Partnership = require('../lib/models/Partnership');

describe('PARTNERSHIP routes test', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let partnership = null;
  let gallery = null;
  // let artwork = null;
  let style = null;
  let artist = null;
  let medium = null;

  beforeEach(async() => {
    style = JSON.parse(JSON.stringify(await Style.create({ name: 'Abstract Expressionism' })));
    medium = JSON.parse(JSON.stringify(await Medium.create({ name: 'Oil Painting' })));
    artist = JSON.parse(JSON.stringify(await Artist.create({ 
      name: 'Willem de Kooning',
      location: 'PDX', 
      styles: style._id,
      medium: medium._id, })));
    // artwork = JSON.parse(JSON.stringify(await Artwork.create({ 
    //   imgUrl: 'notHereYet',
    //   artName: 'Best Painting', 
    //   artist: artist._id, 
    //   medium: medium._id, 
    //   style: style._id })));
    gallery = JSON.parse(JSON.stringify(await Gallery.create({
      name: 'Party Palace Art Gallery & Nintendo Repair',
      location: 'North Pole',
      styles: [style._id],
      owner: 'Robert Bosco',
      rules: 'no dogs',
    })));
    partnership = JSON.parse(JSON.stringify(await Partnership.create({
      artists: [artist._id, gallery._id],
      active: true,
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can use POST to create PARTNERSHIP', () => {
    return request(app)
      .post('/api/v1/partnerships')
      .send(partnership)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          artists: [artist._id, gallery._id],
          active: false,
          __v: 0,
        });
      });
  });

  it('can use GET to get all PARTNERSHIPS', () => {
    return request(app)
      .get('/api/v1/partnerships')
      .then(res => {
        expect(res.body).toEqual([{
          ...partnership,
          __v: 0,
        }]);
      });
  });

  it('can GET single PARTNERSHIP by ID', () => {
    return request(app)
      .get(`/api/v1/partnerships/${partnership._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...partnership,
          __v: 0,
        });
      });
  });

  it('can PUT to UPDATE single PARTNERSHIP by ID', () => {
    return request(app)
      .put(`/api/v1/partnerships/${partnership._id}`)
      .send({
        artist: artist._id,
        gallery: gallery._id,
        active: false,
      })
      .then(res => {
        expect(res.body).toEqual({
          ...partnership,
          active: false,
          __v: 0,
        });
      });
  });

  it('can DELETE a single PARTNERSHIP by ID', () => {
    return request(app)
      .delete(`/api/v1/partnerships/${partnership._id}`)
      .then(res => {
        expect(res.body).toEqual(partnership);
      });
  });
});
