require('dotenv').load();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Mount messages router onto /messages
app.use('/messages', require('./messages'));

app.listen(port, () => {
  console.log('Application listening at http://localhost:' + port + '.');
});

module.exports = app;
