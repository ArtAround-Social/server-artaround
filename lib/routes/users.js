const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      userType,
      name,
      galleryName,
      location,
      styles,
      mediums,
      poster,
      userAuth0Id,
      phone,
      email,
      rules
    } = req.body;

    console.log('##### BODY #####', req.body);

    User
      .create({
        userType,
        name,
        galleryName,
        location,
        styles,
        mediums,
        poster,
        userAuth0Id,
        phone,
        email,
        rules
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

  .get('/auth0/:authId', (req, res, next) => {
    User
      .findOne({ userAuth0Id: req.params.authId })
      .then(user => {
        user
          ? res.send(user)
          : res.send({ userAuth0Id: false });
      })
      .catch(next);
  })

  .get('/user-with-artwork', (req, res, next) => {
    User
      .userWithArt()
      .then(artArray => res.send(artArray))
      .catch(next);
  })
  
  .get('/gallery-partners', (req, res, next) => {
    User
      .galleryPartners()
      .then(artGalAgg => {
        res.send(artGalAgg);
      })
      .catch(next);
  })
  
  .get('/artist-partners', (req, res, next) => {
    User
      .artistPartners()
      .then(artGalAgg => res.send(artGalAgg))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {    
    User
      .findById(req.params.id)
      .then(user => {
        res.send(user);})
      .catch(next);
  })
  
  //needs work
  .put('/:id', (req, res, next) => {
    const {
      userType,
      name,
      location,
      styles,
      mediums,
      poster,
      userAuth0Id,
      phone,
      email,
    } = req.body;

    User
      .findByIdAndUpdate(req.params.id, {
        userType,
        name,
        location,
        styles,
        mediums,
        poster,
        userAuth0Id,
        phone,
        email,
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

