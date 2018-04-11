const request = require('supertest');
const express = require('express');
const router = require('./index');
const crypto = require('crypto');
const db = require('../db');

let server, agent, secret = 'testsecret';

beforeAll(async () => {
  process.env.SECRET_TOKEN = secret;

  const app = express();
  app.use('/messages', router);
  server = app.listen();
  agent = request.agent(server);
});

afterAll(async function() {
  server.close();
});

describe('POST /messages', function() {
  describe('when message is missing in the body', function() {
    test('responds with an error', function() {
      return agent
        .post('/messages')
        .send({ message: null })
        .expect(400)
        .then(({ body }) => {
          expect(body.error).toMatch(/message is required/);
        });
    });
  });

  describe('with a message in body', function() {
    test('responds with the SHA256 hash digest of the message', function() {
      return agent
        .post('/messages')
        .send({ message: 'foo' })
        .expect(200)
        .then(({ body }) => {
          const hash = crypto
            .createHmac('sha256', secret)
            .update('foo')
            .digest('hex');

          expect(body.digest).toEqual(hash);
        });
    });
  });
});

describe('GET /messages/:hash', function() {
  describe('when querying an existing hash', function() {
    beforeAll((done) => {
      db.set('knownhash', { message: 'known-message' });
      done();
    });

    test('responds with the original message', function() {
      return agent
        .get('/messages/knownhash')
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toEqual('known-message');
        })
    });
  });

  describe('when querying an non-existent hash', function() {
    test('responds with a 404 error', function() {
      return agent
        .get('/messages/unknownhash')
        .expect(404);
    });
  });
});
