const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_type: {
    type: String,
    required: true,
  },
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
  userAuth0ID: {
    type: String,
    // required: true,  //this will be required once we integrate user auth with back end
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema);
