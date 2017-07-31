const { expect } = require('chai');
const request = require('supertest');
const { init } = require('../../app');

describe('Todos list API Integration Tests', function() {
  const connectionString = 'mongodb://localhost:27017/pesho';
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

  describe('#GET /log-out ', function() {
    it('should return 302', function(done) {
        request(app)
          .get('/log-out')
          .expect(302)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#GET /authenticated ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/authenticated')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#GET /sign-up ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/sign-up')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#GET /sign-in ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/sign-in')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#POST /sign-up ', function() {
    const obj = {
                password: '12345',
                username: 'pe',
          };
    it('should return 302 when creating user with invalid username or password', function(done) {
        request(app)
          .post('/sign-up')
          .send(obj)
          .expect(302)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#POST /sign-up ', function() {
    const obj = {
                password: '12345609',
                username: '12345609',
          };
    it('should return 302 when creating user with valid username or password', function(done) {
        request(app)
          .post('/sign-up')
          .send(obj)
            .expect(302)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              return done();
            });
    });
  });

  describe('#GET /admin-games ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/admin-games')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#GET /admin-users ', function() {
    it('should return 200', function(done) {
        request(app)
          .get('/admin-users')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            return done();
          });
    });
  });

  describe('#POST /add-game ', function() {
    const obj = {
                password: '12345609',
                username: '12345609',
          };
    it('should return 200 when adding game with invalid user ', function(done) {
        request(app)
          .post('/add-game')
          .send(obj)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              return done();
            });
    });
  });
});
