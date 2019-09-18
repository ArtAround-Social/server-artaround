const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userType: {
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
  console.log('inside USER MODEL in GALLERYPARTNERS function');
  //this agg returns a single gallery with all artist partners
  return this.aggregate(
    [
      {
        '$match': {
          'userType': 'gallery'
        }
      }, {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'gallery', 
          'as': 'artistPartnersWithGallery'
        }
      }, {
        '$unwind': {
          'path': '$artistPartnersWithGallery'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'artistPartnersWithGallery.artist', 
          'foreignField': '_id', 
          'as': 'string'
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
          'userType': 'artist'
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
