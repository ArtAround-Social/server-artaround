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

partnershipSchema.statics.userPartners = function(userId) {
  //this agg returns a single user with all partners
  const ourId = mongoose.Types.ObjectId(userId);
  return this.aggregate(
    [
      {
        '$match': {
          'artists': ourId
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'artists', 
          'foreignField': '_id', 
          'as': 'userPartners'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Partnership', partnershipSchema);
