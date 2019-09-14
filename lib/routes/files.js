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
    // const { artist } = req.body;
    const artist = '5d7bfa5d0ae46c485efe113d';

    const id = req.body;
    console.log(id.artistId);

    Artwork
      .create({ artist })
      .then(artwork => {
        artwork.imgUrl = `googlecloudstorage.${artwork._id}.com`;
        console.log('#### did something ####');

        res.send(artwork);
      })
      .catch(next);
  });
