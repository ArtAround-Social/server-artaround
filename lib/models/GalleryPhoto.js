const mongoose = require('mongoose');

const galleryPhotoSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  galleryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    required: true,
  },
});

module.exports = mongoose.model('GalleryPhoto', galleryPhotoSchema);
