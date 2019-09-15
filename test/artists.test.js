require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Artist = require('../lib/models/Artist');
const Style = require('../lib/models/Style');
const Medium = require('../lib/models/Medium');
const Artwork = require('../lib/models/Artwork');

describe('routes for ARTIST model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let poster = null;
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
    poster = JSON.parse(JSON.stringify(await Artwork.create({ 
      imgUrl: 'notHereYet',
      artName: 'Best Painting', 
      artist: artist._id, 
      medium: medium._id, 
      style: style._id })));
      
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST an ARTIST', () => {
    return request(app)
      .post('/api/v1/artists')
      .send({
        name: 'Jasper Johns',
        location: 'Portland, OR',
        styles: style._id,
        medium: medium._id,
        poster: poster._id,
        // artistAuth0ID: 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jasper Johns',
          location: 'Portland, OR',
          styles: [style._id],
          medium: [medium._id],
          poster: expect.any(String),
          artistAuth0ID: '1234',
          __v: 0,
        });
      });
  });

  it('can GET all ARTISTS ', () => {
    return request(app)
      .get('/api/v1/artists')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Willem de Kooning',
          location: 'PDX',
          styles: [style._id],
          medium: [medium._id],
          __v: 0,
        }]);
      });
  });

  it('can GET a single ARTIST by ID', () => {
    return request(app)
      .get(`/api/v1/artists/${artist._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Willem de Kooning',
          location: 'PDX',
          styles: [style._id],
          medium: [medium._id],
          __v: 0,
        });
      });
  });

  it('can PUT to UPDATE ARTIST by ID', () => {
    return request(app)
      .put(`/api/v1/artists/${artist._id}`)
      .send({
        ...artist,
        name: 'Willem de BOOOoooning (get it, for halloween!)',
        location: 'Icy Hell Moon, with Rambo',
        poster: [[poster._id]],
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: artist._id,
          name: 'Willem de BOOOoooning (get it, for halloween!)',
          location: 'Icy Hell Moon, with Rambo',
          styles: [style._id],
          medium: [medium._id],
          poster: poster._id,
          __v: 0,
        });
      });
  });

  it('can DELETE ARTIST by ID', () => {
    return request(app)
      .delete(`/api/v1/artists/${artist._id}`)
      .then(res => {
        expect(res.body).toEqual(artist);
      });
  });
});
 
