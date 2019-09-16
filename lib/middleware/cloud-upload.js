const { Storage } = require('@google-cloud/storage');
const path = require('path');
const CLOUD_BUCKET = 'artaround';

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../artaround-3cfc51389608.json'),
  projectId: 'artaround-252817'
});

// storage.getBuckets().then(x => console.log(x));

const bucket = storage.bucket(CLOUD_BUCKET);


module.exports = (req, res, next) => {
  if(!req.file) {
    return next();
  }
  console.log('@@@@@ CLOUD UPLOAD MW @@@@@');

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
  };

  console.log('@@@@ FILE NAMING FUNC', getPublicUrl(gcsname));
  req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err, '!!!@@@ HUSTON WE HAVE A PROBLEM @@@!!!');
  });

  stream.on('finish', () => {
    console.log('@@@ GCS ON FINISH');
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      // console.log('#### FILE NAMING FUNC', getPublicUrl(gcsname));
      // req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
  next();
};
