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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  }],
  artworks: [{      
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true,
  }],
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);
