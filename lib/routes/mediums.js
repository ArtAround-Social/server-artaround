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
      .select({ _id: true, name: true })
      .then(mediums => res.send(mediums))
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

  //probably won't need this route, but who knows
  .delete('/:id', (req, res, next) => {
    console.log('ROUTE ln 38', req.params.id);
    Medium
      .findByIdAndDelete(req.params.id)
      .select({ __v: false })
      .then(deletedMedium => res.send(deletedMedium))
      .catch(next);
  });
