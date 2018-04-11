// Obviously, we would substitute this database for a
// sturdier one in production. :)
// NOTE: no disk persistence, only store in memory for life of application.

const dirty = require('dirty');
const db = dirty();

module.exports = db;
