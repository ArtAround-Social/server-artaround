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
    ref: 'User',
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

artworkSchema.statics.userWithArt = function(userId) {
  const ourId = mongoose.Types.ObjectId(userId);
  return this.aggregate(
    [
      {
        '$match': {
          'artist': ourId
        }
      }
    ]
  );
};

artworkSchema.statics.artByArtist = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'users', 
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
