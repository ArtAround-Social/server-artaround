const mongoose = require('mongoose');

const mediumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Medium', mediumSchema);
