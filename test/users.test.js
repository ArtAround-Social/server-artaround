require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('routes for User model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let userStyle;
  let user;
  let userMedium;
  let userPoster;

  beforeEach(async() => {
    userStyle = mongoose.Types.ObjectId(),
    userMedium = mongoose.Types.ObjectId(),
    userPoster = mongoose.Types.ObjectId(),
    user = JSON.parse(JSON.stringify(await User.create({ 
      user_type: 'artist',
      name: 'Willem de Kooning',
      location: 'PDX', 
      styles: [userStyle],
      mediums: [userMedium],
      userAuth0Id: 'auth0|12345678',
      phone: '1234567890',
      email: 'kwilliam@protonmail.com'
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST user', () => {
    return request(app)
      .post('/api/v1/users')
      .send({ 
        user_type: 'artist',
        name: 'Jeffrey',
        location: 'Israel', 
        styles: [userStyle],
        mediums: [userMedium],
        userAuth0Id: 'auth0|87654321',
        phone: '0987654321',
        email: 'james@protonmail.com'
      })
      .then(res => {
        console.log('#########', typeof res.body._id);
        expect(res.body).toEqual({
          _id: expect.any(String),
          user_type: 'artist',
          name: 'Jeffrey',
          location: 'Israel', 
          styles: [expect.any(String)],
          mediums: [expect.any(String)],
          userAuth0Id: 'auth0|87654321',
          phone: '0987654321',
          email: 'james@protonmail.com',
          __v: 0,
        });
      });
  });

  it('can GET all users ', () => {
    return request(app)
      .get('/api/v1/users')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          user_type: 'artist',
          name: 'Willem de Kooning',
          location: 'PDX', 
          styles: [expect.any(String)],
          mediums: [expect.any(String)],
          userAuth0Id: 'auth0|12345678',
          phone: '1234567890',
          email: 'kwilliam@protonmail.com',
          __v: 0,
        }]);
      });
  });

  it('can GET a single User by ID', () => {
    return request(app)
      .get(`/api/v1/users/${user._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: user._id,
          user_type: 'artist',
          name: 'Willem de Kooning',
          location: 'PDX', 
          styles: [expect.any(String)],
          mediums: [expect.any(String)],
          userAuth0Id: 'auth0|12345678',
          phone: '1234567890',
          email: 'kwilliam@protonmail.com',
          __v: 0,
        });
      });
  });

  it('can PUT to UPDATE user by ID', () => {
    return request(app)
      .put(`/api/v1/users/${user._id}`)
      .send({
        ...user,
        name: 'Johnny',
        location: 'Jakes Basement',
        poster: userPoster,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: user._id,
          user_type: 'artist',
          name: 'Johnny',
          location: 'Jakes Basement', 
          poster: expect.any(String),
          styles: [expect.any(String)],
          mediums: [expect.any(String)],
          userAuth0Id: 'auth0|12345678',
          phone: '1234567890',
          email: 'kwilliam@protonmail.com',
          __v: 0,
        });
      });
  });

  it('can DELETE user by ID', () => {
    return request(app)
      .delete(`/api/v1/users/${user._id}`)
      .then(res => {
        expect(res.body).toEqual(user);
      });
  });
});
