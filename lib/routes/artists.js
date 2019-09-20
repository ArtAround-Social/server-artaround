const { Router } = require('express');
const Artist = require('../models/Artist');
// const Medium = require('../models/Medium');
// const Style = require('../models/Style');
// const Artwork = require('../models/Artwork');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name,
      location,
      styles,
      medium,
      poster,
      artistAuth0ID = '1234' } = req.body;

    Artist
      .create({ name, location, styles, medium, poster, artistAuth0ID })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Artist
      .find()
      // .select({ _id: true, name: true, __v: false })
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/artist-with-artwork', (req, res, next) => {
    Artist
      .artistWithArt()
      .then(artArray => res.send(artArray))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {    
    Artist
      .findById(req.params.id)
      // .select({ __v: false })
      .then(artist => {
        res.send(artist);})
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, location, styles, medium, poster } = req.body;

    Artist
      .findByIdAndUpdate(req.params.id, 
        { name, location, styles, medium, poster, }, { new: true })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Artist
      .findByIdAndDelete(req.params.id)
      // .select({ __v: false })
      .then(deletedArtist => res.send(deletedArtist))
      .catch(next);
  });

