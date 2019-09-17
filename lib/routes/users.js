const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user_type,
      name,
      location,
      styles,
      mediums,
      poster,
      userAuth0Id,
      phone,
      email
    } = req.body;

    User
      .create({
        user_type,
        name,
        location,
        styles,
        mediums,
        poster,
        userAuth0Id,
        phone,
        email
      })
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {    
    User
      .findById(req.params.id)
      .then(user => {
        res.send(user);})
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const {
      user_type,
      name,
      location,
      styles,
      mediums,
      poster,
      userAuth0Id,
      phone,
      email
    } = req.body;

    User
      .findByIdAndUpdate(req.params.id, {
        user_type,
        name,
        location,
        styles,
        mediums,
        poster,
        userAuth0Id,
        phone,
        email
      }, { new: true })
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });

