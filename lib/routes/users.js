const { Router } = require('express');
const User = require('../models/User');
// const Medium = require('../models/Medium');
// const Style = require('../models/Style');
// const Artwork = require('../models/Artwork');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user_type,
      name,
      location,
      styles,
      medium,
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
        medium,
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
      // .select({ _id: true, name: true, __v: false })
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {    
    User
      .findById(req.params.id)
      // .select({ __v: false })
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
      medium,
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
        medium,
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
      // .select({ __v: false })
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });

