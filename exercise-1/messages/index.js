const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./messages.controller');
const router = express.Router();

// Use middleware to always respond with application/json
router.use((req, res, next) => {
  res.contentType('application/json');
  next();
});

// Parse submitted body as JSON
router.use(bodyParser.json());

// Routes
router.post('/', controller.create);
router.get('/:hash', controller.show);

module.exports = router;
