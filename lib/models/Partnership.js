const mongoose = require('mongoose');

const partnershipSchema = mongoose.Schema({
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Partnership', partnershipSchema);
