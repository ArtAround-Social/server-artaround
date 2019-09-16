require('dotenv').config();

// const request = require('supertest');
// const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

// Possible future test to mock formdata
// currently not working

// const testImg = jest.mock('./test-assets/my-portrait.jpg', ()=>'my-portrait.jpg');

// function FormDataMock() {
//   this.append = jest.fn();
// }
// global.FormData = FormDataMock;

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

  it('is a passing test', () => {
    const id = mongoose.Types.ObjectId();
    expect(id).toEqual(expect.any(mongoose.Types.ObjectId));
  });
});
