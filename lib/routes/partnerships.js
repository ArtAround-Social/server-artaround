const { Router } = require('express');
const Partnership = require('../models/Partnership');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { artists, active } = req.body;

    Partnership
      .create({ artists, active })
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Partnership
      .find()
      .then(partnerships => res.send(partnerships))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Partnership
      .findById(req.params.id)
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { artist, gallery, active } = req.body;
    Partnership
      .findByIdAndUpdate(req.params.id, { artist, gallery, active }, {new: true })
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Partnership
      .findByIdAndDelete(req.params.id)
      .then(partnership => res.send(partnership))
      .catch(next);
  });
