const mongoose = require('mongoose');

const styleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Style', styleSchema);
