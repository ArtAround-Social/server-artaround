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
  location: {
    type: String,
    required: true
  },
  styles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true
  }],
  mediums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
    required: true,
  }],
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  userAuth0Id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rules: String
});

module.exports = mongoose.model('User', userSchema);
