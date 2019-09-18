const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  galleryName: String,
  location: {
    type: String,
    required: true
  },
  styles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style'
  }],
  mediums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
  }],
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  userAuth0Id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rules: String
});

userSchema.statics.userWithArt = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'artworks', 
          'localField': '_id', 
          'foreignField': 'artist', 
          'as': 'artistArtworks'
        }
      }, 
      // {
      //   '$unwind': {
      //     'path': '$artistArtworks'
      //   }
      // }
    ]
  );
};

userSchema.statics.galleryPartners = function() {
  return this.aggregate(
    [
      {
        '$match': {
          'user_type': 'gallery'
        }
      }, {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'gallery', 
          'as': 'artistPartnersOfGallery'
        }
      }
    ]
  );
};

userSchema.statics.artistPartners = function() {
  return this.aggregate(
    [
      {
        '$match': {
          'user_type': 'artist'
        }
      }, {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'artist', 
          'as': 'galleryPartnersOfArtist'
        }
      }
    ]
  );
};


module.exports = mongoose.model('User', userSchema);
