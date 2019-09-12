const mongoose = require('mongoose');

const exhibitionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    required: true,
  },
  artists: [{
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: 'True'
    }
  }],
  artworks: [{
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true,
    }
  }],
  endDate: {
    type: Date,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);
