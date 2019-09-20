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

userSchema.statics.allArtists = function() {
  return this.aggregate(
    [
      {
        '$match': {
          'userType': 'artist'
        }
      }
    ]
  );
};

userSchema.statics.userWithArt = function(userId) {
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

userSchema.statics.userPartners = function(userId) {
  //this agg returns a single user with all partners
  const ourId = mongoose.Types.ObjectId(userId);
  return this.aggregate(
    [
      {
        '$match': {
          '_id': ourId
        }
      }, {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'artists', 
          'as': 'partnerships'
        }
      }
    ]
  );
};


module.exports = mongoose.model('User', userSchema);
