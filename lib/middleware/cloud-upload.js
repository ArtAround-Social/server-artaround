const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = 'artaround';
const client_email = process.env.CLIENT_EMAIL;
const private_key = process.env.PRIVATE_KEY;

const storage = new Storage({
  credentials: {
    client_email,
    private_key
  },
  projectId: 'artaround-252817',
});

const bucket = storage.bucket(CLOUD_BUCKET);

module.exports = (req, res, next) => {
  if(!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
  };

  req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    // eslint-disable-next-line no-console
    console.log('Uploaded file to Google Cloud Storage');
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      next();
    });
  });

  stream.end(req.file.buffer);
};
