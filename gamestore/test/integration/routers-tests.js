const { expect } = require('chai');
const request = require('supertest');
const { init } = require('../../app');

describe('Todos list API Integration Tests', function() {
  const connectionString = 'mongodb://localhost:27017/gamestore';
  let app = null;
  beforeEach(() => {
    return Promise.resolve()
      .then(() => require('../../db/mongodb').init(connectionString))
      .then((db) => require('../../data').init(db))
      .then((data) => require('../../app').init(data))
      .then((_app) => {
        app = _app;
      });
  });

  describe('#GET / ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            console.log(res.body);
            return done();
          });
    });
  });

  describe('#GET /games ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/games')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            console.log(res.body);
            return done();
          });
    });
  });

  describe('#GET /search ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/search')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#GET /search ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/log-out')
          .expect(302)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            console.log(res.body);
            return done();
          });
    });
  });
});
