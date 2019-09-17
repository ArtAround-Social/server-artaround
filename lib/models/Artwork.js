const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  artName: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  medium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
  },
  style: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
  },
});

artworkSchema.statics.artByArtist = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'artists', 
          'localField': 'artist', 
          'foreignField': '_id', 
          'as': 'withArtist'
        }
      }, {
        '$unwind': {
          'path': '$withArtist'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Artwork', artworkSchema);
