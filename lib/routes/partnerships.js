const { Router } = require('express');
const Partnership = require('../models/Partnership');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { artists } = req.body;

    Partnership
      .create({ artists, active: false })
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Partnership
      .find()
      .then(partnerships => res.send(partnerships))
      .catch(next);
  })

  .get('/user-partners/:id', (req, res, next) => {
    Partnership
      .userPartners(req.params.id)
      .then(partnersAgg => {
        res.send(partnersAgg);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Partnership
      .findById(req.params.id)
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { artists, active } = req.body;
    Partnership
      .findByIdAndUpdate(req.params.id, { artists, active }, { new: true })
      .then(partnership => res.send(partnership))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Partnership
      .findByIdAndDelete(req.params.id)
      .then(partnership => res.send(partnership))
      .catch(next);
  });
