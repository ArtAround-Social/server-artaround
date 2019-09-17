const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    required: true
  },
  artName: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  medium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
  },
  style: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
  },
});

module.exports = mongoose.model('Artwork', artworkSchema);
