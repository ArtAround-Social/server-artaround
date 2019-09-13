const { Router } = require('express');
const Style = require('../models/Style');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name } = req.body;

    Style
      .create({ name })
      .then(style => res.send(style))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Style
      .find()
      .select({ _id: true, name: true })
      .then(styles => res.send(styles))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Style
      .findById(req.params.id)
      .then(style => res.send(style))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Style
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedStyle => res.send(updatedStyle))
      .catch(next);
  })

  //probably won't need this route, but who knows
  .delete('/:id', (req, res, next) => {
    Style
      .findByIdAndDelete(req.params.id)
      .then(deletedStyle => res.send(deletedStyle))
      .catch(next);
  });
