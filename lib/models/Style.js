const mongoose = require('mongoose');

const styleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

styleSchema.statics.galleryByStyle = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'galleries', 
          'localField': '_id', 
          'foreignField': 'styles', 
          'as': 'galByStyles'
        }
      }
    ]
  );
};

styleSchema.statics.artistByStyle = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'artists', 
          'localField': '_id', 
          'foreignField': 'styles', 
          'as': 'artistsByStyles'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Style', styleSchema);
