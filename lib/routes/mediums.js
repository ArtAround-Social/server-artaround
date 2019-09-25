const { Router } = require('express');
const Medium = require('../models/Medium');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name } = req.body;

    Medium
      .create({ name })
      .then(medium => res.send(medium))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Medium
      .find()
      .then(mediums => res.send(mediums))
      .catch(next);
  })

  .get('/art-by-medium', (req, res, next) => {
    Medium
      .artByMedium()
      .then(artArray => res.send(artArray))
      .catch(next);
  })

  .get('/user-by-medium', (req, res, next) => {
    Medium
      .userByMedium()
      .then(userArray => res.send(userArray))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Medium
      .findById(req.params.id)
      .then(medium => res.send(medium))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Medium
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedMedium => res.send(updatedMedium))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Medium
      .findByIdAndDelete(req.params.id)
      .select({ __v: false })
      .then(deletedMedium => res.send(deletedMedium))
      .catch(next);
  });
