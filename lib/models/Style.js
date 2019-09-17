const mongoose = require('mongoose');

const styleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

styleSchema.statics.usersByStyle = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'users', 
          'localField': '_id', 
          'foreignField': 'styles', 
          'as': 'usersByStyles'
        }
      }
    ]
  );
};
module.exports = mongoose.model('Style', styleSchema);
