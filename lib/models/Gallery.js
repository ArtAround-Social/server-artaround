const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  styles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true,
  }],
  owner: {
    type: String,
    required: true,
  },
  rules: [{
    type: String,
  }]
});

gallerySchema.statics.artistGalleryPartners = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'gallery', 
          'as': 'partnerships'
        }
      }, {
        '$unwind': {
          'path': '$partnerships'
        }
      }, {
        '$lookup': {
          'from': 'artists', 
          'localField': 'partnerships.artist', 
          'foreignField': '_id', 
          'as': 'artistPartner'
        }
      }, {
        '$unwind': {
          'path': '$artistPartner'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Gallery', gallerySchema);
