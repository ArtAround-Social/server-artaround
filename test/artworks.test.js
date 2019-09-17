require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Artist = require('../lib/models/Artist');
const Style = require('../lib/models/Style');
const Medium = require('../lib/models/Medium');
const Artwork = require('../lib/models/Artwork');

describe('ARTWORK routes test', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let artwork = null;
  let artwork2 = null;
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
    artwork = JSON.parse(JSON.stringify(await Artwork.create({ 
      imgUrl: 'notHereYet',
      artName: 'Best Painting', 
      artist: artist._id, 
      medium: medium._id, 
      style: style._id })));
    artwork2 = JSON.parse(JSON.stringify(await Artwork.create({ 
      imgUrl: 'notHereYet',
      artName: 'Worst Painting', 
      artist: artist._id, 
      medium: medium._id, 
      style: style._id }))); 
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can use POST to create ARTWORK', () => {
    return request(app)
      .post('/api/v1/artworks')
      .send({
        imgUrl: 'notHereYet',
        artName: 'Best Art Ever',
        artist: artist._id,
        medium: medium._id,
        style: style._id,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          imgUrl: 'notHereYet',
          artName: 'Best Art Ever',
          artist: artist._id,
          medium: medium._id,
          style: style._id,
          __v: 0,
        });
      });
  });

  it('can use GET to get all ARTWORKS', () => {
    return request(app)
      .get('/api/v1/artworks')
      .then(res => {
        expect(res.body).toEqual([{
          ...artwork,
          __v: 0,
        }, {
          ...artwork2,
          __v: 0,
        }]);
      });
  });

  it('can GET single ARTWORK by ID', () => {
    return request(app)
      .get(`/api/v1/artworks/${artwork._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...artwork,
          __v: 0,
        });
      });
  });

  it('can DELETE a single ARTWORK', () => {
    return request(app)
      .delete(`/api/v1/artworks/${artwork._id}`)
      .then(res => {
        expect(res.body).toEqual(artwork);
      });
  });
});
