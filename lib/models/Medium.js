const mongoose = require('mongoose');

const mediumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

mediumSchema.statics.artByMedium = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'artworks', 
          'localField': '_id', 
          'foreignField': 'medium', 
          'as': 'artByMedium'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Medium', mediumSchema);
