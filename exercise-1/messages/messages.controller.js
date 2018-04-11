const crypto = require('crypto');
const db = require('../db');

module.exports = { create, show };

function create(req, res) {
  const { body } = req;

  if (!body.message) {
    return res.status(400).send({ error: 'A message is required.' });
  }

  // hash the message
  const hash = crypto
    .createHmac('sha256', process.env.SECRET_TOKEN)
    .update(body.message)
    .digest('hex');

  // store the hash as a key so we can retrieve it later
  db.set(hash, { message: body.message });

  // respond with the hash digest
  res.status(200).send({ digest: hash });
}

function show(req, res) {
  const { params: { hash } } = req;
  const message = db.get(hash);

  if (!hash || !message) {
    return res.status(404).send({ error: "Message not found." });
  }

  res.status(200).send(message);
}
