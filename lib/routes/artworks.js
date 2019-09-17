const { Router } = require('express');
const Artwork = require('../models/Artwork');
// const Artist = require('../models/Artist');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { imgUrl, artName, artist, medium, style } = req.body;

    Artwork
      .create({ imgUrl, artName, artist, medium, style })
      .then(artwork => res.send(artwork))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Artwork
      .find()
      .then(artworks => res.send(artworks))
      .catch(next);
  })

  .get('/art-by-artists', (req, res, next) => {
    Artwork
      .artByArtist()
      .then(artArray => res.send(artArray))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Artwork
      .findById(req.params.id)
      .then(artwork => res.send(artwork))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Artwork
      .findByIdAndDelete(req.params.id)
      .then(deletedArtwork => res.send(deletedArtwork))
      .catch(next);
  });
