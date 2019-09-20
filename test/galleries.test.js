require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Gallery = require('../lib/models/Gallery');
const Artist = require('../lib/models/Artist');
const Style = require('../lib/models/Style');
const Medium = require('../lib/models/Medium');
const Artwork = require('../lib/models/Artwork');

describe('GALLERY routes test', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let gallery = null;
  // let artwork = null;
  let style = null;
  // let artist = null;
  // let medium = null;

  beforeEach(async() => {
    style = JSON.parse(JSON.stringify(await Style.create({ name: 'Abstract Expressionism' })));
    medium = JSON.parse(JSON.stringify(await Medium.create({ name: 'Oil Painting' })));
    // artist = JSON.parse(JSON.stringify(await Artist.create({ 
    //   name: 'Willem de Kooning',
    //   location: 'PDX', 
    //   styles: style._id,
    //   medium: medium._id, })));
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
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can use POST to create GALLERY', () => {
    return request(app)
      .post('/api/v1/galleries')
      .send(gallery)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Party Palace Art Gallery & Nintendo Repair',
          location: 'North Pole',
          styles: [style._id],
          owner: 'Robert Bosco',
          rules: ['no dogs'],
          __v: 0,
        });
      });
  });

  it('can use GET to get all GALLERIES', () => {
    return request(app)
      .get('/api/v1/galleries')
      .then(res => {
        expect(res.body).toEqual([{
          ...gallery,
          __v: 0,
        }]);
      });
  });

  it('can GET single GALLERY by ID', () => {
    return request(app)
      .get(`/api/v1/galleries/${gallery._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...gallery,
          __v: 0,
        });
      });
  });
});
