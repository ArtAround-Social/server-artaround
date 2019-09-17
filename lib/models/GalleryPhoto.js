const mongoose = require('mongoose');

const galleryPhotoSchema = mongoose.Schema({
  imgUrl: String,
  galleryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    required: true,
  },
});

module.exports = mongoose.model('GalleryPhoto', galleryPhotoSchema);
