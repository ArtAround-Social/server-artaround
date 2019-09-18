const User = require('../lib/models/User');
const Style = require('../lib/models/Style');
const Medium = require('../lib/models/Medium');
const Artwork = require('../lib/models/Artwork');
const Partnership = require('../lib/models/Partnership');

let style1;
let style2;
let style3;

let medium1;
let medium2;
let medium3;

let user1;
let user2;
let user3;
let user4;

let artwork1;
let artwork2;
let artwork3;
let artwork4;

let partnership1;
let partnership2;
let partnership3;


//fakeId = mongoose.Types.ObjectId()

beforeEach(async() => {
  // STYLES
  style1 = JSON.parse(JSON.stringify(await Style.create({
    name: 'Impressionism'
  })));
  style2 = JSON.parse(JSON.stringify(await Style.create({
    name: 'Classicism'
  })));
  style3 = JSON.parse(JSON.stringify(await Style.create({
    name: 'Post-Modern'
  })));

  // MEDIUMS
  medium1 = JSON.parse(JSON.stringify(await Medium.create({
    name: 'Oil Paint'
  })));
  medium2 = JSON.parse(JSON.stringify(await Medium.create({
    name: 'Charcoal'
  })));
  medium3 = JSON.parse(JSON.stringify(await Medium.create({
    name: 'Finger Painting'
  })));

  // USERS
  user1 = JSON.parse(JSON.stringify(await User.create({
    user_type: 'artist',
    name: 'Willem de Kooning',
    location: 'PDX', 
    styles: [style1._id],
    mediums: [medium1._id],
    userAuth0Id: 'auth0|12345678',
    phone: '1234567890',
    email: 'kwilliam@protonmail.com'
  })));
  user2 = JSON.parse(JSON.stringify(await User.create({
    user_type: 'artist',
    name: 'Jack',
    location: 'PDX', 
    styles: [style2._id],
    mediums: [medium2._id],
    userAuth0Id: 'auth0|01234567',
    phone: '0987612345',
    email: 'jack@protonmail.com'
  })));
  user3 = JSON.parse(JSON.stringify(await User.create({
    user_type: 'gallery',
    name: 'Bills Thoughts',
    location: 'London', 
    styles: [style3._id],
    mediums: [medium3._id],
    userAuth0Id: 'auth0|34567890',
    phone: '0987654321',
    email: 'bill@protonmail.com'
  })));
  user4 = JSON.parse(JSON.stringify(await User.create({
    user_type: 'gallery',
    name: 'April Breeze',
    location: 'Paris', 
    styles: [style1._id],
    mediums: [medium3._id],
    userAuth0Id: 'auth0|23456789',
    phone: '1234560987',
    email: 'april@protonmail.com'
  })));

  // ARTWORKS
  artwork1 = JSON.parse(JSON.stringify(await Artwork.create({
    imgUrl: 'somethign.com',
    artName: 'art1',
    artist: user1._id,
    medium: medium1._id,
    style: style1._id
  })));
  artwork2 = JSON.parse(JSON.stringify(await Artwork.create({
    imgUrl: 'some.com',
    artName: 'art2',
    artist: user1._id,
    medium: medium2._id,
    style: style2._id
  })));
  artwork3 = JSON.parse(JSON.stringify(await Artwork.create({
    imgUrl: 'makeme.com',
    artName: 'art3',
    artist: user2._id,
    medium: medium3._id,
    style: style3._id
  })));
  artwork4 = JSON.parse(JSON.stringify(await Artwork.create({
    imgUrl: 'lancer.com',
    artName: 'art4',
    artist: user2._id,
    medium: medium1._id,
    style: style3._id
  })));

  // PARTNERSHIPS
  partnership1 = JSON.parse(JSON.stringify(await Partnership.create({
    artist: user1._id,
    gallery: user3._id,
    active: true
  })));
  partnership2 = JSON.parse(JSON.stringify(await Partnership.create({
    artist: user1._id,
    gallery: user4._id,
    active: true
  })));
  partnership3 = JSON.parse(JSON.stringify(await Partnership.create({
    artist: user2._id,
    gallery: user4._id,
    active: false
  })));
});
