const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: false,
  },
  styles: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Style',
      required: true
    }
  ],
  medium: {
    type: String,
    required: true,
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true,

  },
  artistAuth0ID: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Artist', artistSchema);
