const { Router } = require('express');
// const fs = require('fs');
const Artwork = require('../models/Artwork');
// const { Storage } = require('@google-cloud/storage');
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
  .post('/artwork', multer.single('file'), uploadMW, (req, res, next) => {
    // const { artist } = req.body;
    const artist = '5d7bfa5d0ae46c485efe113d';

    Artwork
      .create({ artist })
      .then(async artwork => {
        artwork.imgUrl = `googlecloudstorage.${artwork._id}.com`;
        console.log('#### did something ####');

        res.send(artwork);
      })
      .catch(next);
  });
