const { Router } = require('express');
const Artwork = require('../models/Artwork');
const GalleryPhoto = require('../models/GalleryPhoto');
const uploadMW = require('../middleware/cloud-upload');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

module.exports = Router()
  .post('/artist', multer.single('photo'), uploadMW, (req, res, next) => {
    Artwork
      .create({
        artist: req.body.id,
        imgUrl: req.file.cloudStoragePublicUrl
      })
      .then(artwork => {
        res.send(artwork);
      })
      .catch(next);
  })
  
  .post('/gallery', multer.single('photo'), uploadMW, (req, res, next) => {
    GalleryPhoto
      .create({
        galleryId: req.body.id,
        imgUrl: req.file.cloudStoragePublicUrl
      })
      .then(photo => res.send(photo))
      .catch(next);
  });
