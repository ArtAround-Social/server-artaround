const { Router } = require('express');
const User = require('../models/User');
// const Medium = require('../models/Medium');
// const Style = require('../models/Style');
// const Artwork = require('../models/Artwork');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name,
      location,
      styles,
      medium,
      poster = 'noImgYet',
      artistAuth0ID = '1234' } = req.body;

    User
      .create({ name, location, styles, medium, poster, artistAuth0ID })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      // .select({ _id: true, name: true, __v: false })
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {    
    User
      .findById(req.params.id)
      // .select({ __v: false })
      .then(artist => {
        res.send(artist);})
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, location, styles, medium, poster } = req.body;

    User
      .findByIdAndUpdate(req.params.id, 
        { name, location, styles, medium, poster, }, { new: true })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      // .select({ __v: false })
      .then(deletedArtist => res.send(deletedArtist))
      .catch(next);
  });

