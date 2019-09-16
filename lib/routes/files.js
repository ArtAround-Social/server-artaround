const { Router } = require('express');
const Artwork = require('../models/Artwork');
// const GalleryPhoto = require('../models/GalleryPhoto');
const uploadMW = require('../middleware/cloud-upload');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

module.exports = Router()
  .post('/artwork', multer.single('photo'), uploadMW, (req, res, next) => {
    Artwork
      .create({ artist: req.body.id })
      .then(artwork => {
        artwork.imgUrl = req.file.cloudStoragePublicUrl;
        res.send(artwork);
      })
      .catch(next);
  });
