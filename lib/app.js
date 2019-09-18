const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/files', require('./routes/files'));
app.use('/api/v1/mediums', require('./routes/mediums'));
app.use('/api/v1/styles', require('./routes/styles'));
app.use('/api/v1/artists', require('./routes/artists'));
app.use('/api/v1/artworks', require('./routes/artworks'));
app.use('/api/v1/galleries', require('./routes/galleries'));
app.use('/api/v1/partnerships', require('./routes/partnerships'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
