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
  location: {
    type: String,
    required: true
  },
  styles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true
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
          'as': 'string'
        }
      }
    ]
  );
};

userSchema.statics.galleryPartners = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'user', 
          'as': 'partnerships'
        }
      }, {
        '$unwind': {
          'path': '$partnerships'
        }
      }, {
        '$lookup': {
          'from': 'users', 
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

userSchema.statics.artistPartners = function() {
  return this.aggregate(
    [
      {
        '$lookup': {
          'from': 'partnerships', 
          'localField': '_id', 
          'foreignField': 'user', 
          'as': 'partnerships'
        }
      }, {
        '$unwind': {
          'path': '$partnerships'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'partnerships.gallery', 
          'foreignField': '_id', 
          'as': 'galleryPartner'
        }
      }, {
        '$unwind': {
          'path': '$galleryPartner'
        }
      }
    ]
  );
};


module.exports = mongoose.model('User', userSchema);
