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
    console.log('##### POST ROUTE #####');
    console.log('#### POST ROUTE ARTIST ID', req.body.artistId);
    
    
    Artwork
      .create({ artist: req.body.artistId })
      .then(artwork => {
        artwork.imgUrl = req.file.cloudStoragePublicUrl;
        // console.log('#### THEN POST ROUTE ####');
        // console.log('#### THEN POST Image URL', req.file.cloudStoragePublicUrl);
        res.send(artwork);
      })
      .catch(next);
  });
