const { Router } = require('express');
const Gallery = require('../models/Gallery');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, location, styles, owner, rules } = req.body;

    Gallery
      .create({ name, location, styles, owner, rules })
      .then(gallery => res.send(gallery))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Gallery
      .find()
      .then(galleries => res.send(galleries))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Gallery
      .findById(req.params.id)
      .then(gallery => res.send(gallery))
      .catch(next);
  });

