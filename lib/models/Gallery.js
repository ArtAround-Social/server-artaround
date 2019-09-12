const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  styles: [{
    style: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Style',
      required: true,
    }
  }],
  owner: {
    type: String,
    required: true,
  },
  Rules: [{
    type: String,
    required: false,
  }]
});

module.exports = mongoose.model('Gallery', gallerySchema);
