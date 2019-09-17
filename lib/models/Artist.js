const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location:{
    type: String,
  },
  styles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true
  }],
  medium: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
    required: true,
  }],
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    // required: true,
  },
  artistAuth0ID: {
    type: String,
    // required: true,  //this will be required once we integrate user auth with back end
  }
});

artistSchema.statics.artistWithArt = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'artworks', 
          'localField': '_id', 
          'foreignField': 'artist', 
          'as': 'string'
        }
      }
    ]
  );
};

module.exports = mongoose.model('Artist', artistSchema);
