const should = require('should');
const Utilify = require('./index');

describe('Node/JS Utilify', () => {
  describe('is Functions', () => {
    it('is Array true', (done) => {
      Utilify.isArray([]).should.equal(true);
      done();
    });
    it('is Array false', (done) => {
      Utilify.isArray({}).should.equal(false);
      done();
    });
  });

  /* describe('Driver configuration', () => {
    it('Connection string is configurable', (done) => {
      MongoDriver.MongoDBManager.configure({
        connectionString: connStr,
        hasCert: hasCert,
        certPath: certPath,
        dbName: dbName
      });
      (MongoDriver.MongoDBManager.CONNECTION_STRING).should.equal(connStr);
      done();
    });

    it('Database name is configurable', (done) => {
      MongoDriver.MongoDBManager.configure({
        connectionString: connStr,
        hasCert: hasCert,
        certPath: certPath,
        dbName: dbName
      });
      (MongoDriver.MongoDBManager.DATABASE_NAME).should.equal(dbName);
      done();
    });

    it('Certificate option is by default true', (done) => {
      MongoDriver.MongoDBManager.configure();
      (MongoDriver.MongoDBManager.HAS_CERT).should.equal(true);
      done();
    });
  }); */

  /* describe('Database operations', () => {

  }); */
});