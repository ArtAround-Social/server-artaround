const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location:{
    type: String,
  },
  styles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true
  }],
  medium: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
    required: true,
  }],
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    // required: true,
  },
  artistAuth0ID: {
    type: String,
    // required: true,  //this will be required once we integrate user auth with back end
  }
});

module.exports = mongoose.model('Artist', artistSchema);
