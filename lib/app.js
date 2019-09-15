const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/mediums', require('./routes/mediums'));
app.use('/api/v1/styles', require('./routes/styles'));
app.use('/api/v1/artists', require('./routes/artists'));
app.use('/api/v1/artworks', require('./routes/artworks'));
app.use('/api/v1/galleries', require('./routes/galleries'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
