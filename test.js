const should = require('should');
const Utilify = require('./index');

describe('Node/JS Utilify', () => {
  describe('is Functions', () => {
    describe('Array', () => {
      it('is Array true', (done) => {
        Utilify.isArray([]).should.equal(true);
        done();
      });
      it('is Array object false', (done) => {
        Utilify.isArray({}).should.equal(false);
        done();
      });
      it('is Array boolean false', (done) => {
        Utilify.isArray(true).should.equal(false);
        done();
      });
      it('is Array string false', (done) => {
        Utilify.isArray('[]').should.equal(false);
        done();
      });
      it('is Array number false', (done) => {
        Utilify.isArray(10).should.equal(false);
        done();
      });
      it('is Array function false', (done) => {
        Utilify.isArray(() => { }).should.equal(false);
        done();
      });
    });

    describe('Number', () => {
      it('is Number 5 true', (done) => {
        Utilify.isNumber(5).should.equal(true);
        done();
      });
      it('is Number NaN true', (done) => {
        Utilify.isNumber('a5' * 5).should.equal(true);
        done();
      });
      it('is Number object false', (done) => {
        Utilify.isNumber({}).should.equal(false);
        done();
      });
      it('is Number boolean false', (done) => {
        Utilify.isNumber(true).should.equal(false);
        done();
      });
      it('is Number string false', (done) => {
        Utilify.isNumber('[]').should.equal(false);
        done();
      });
      it('is Number array false', (done) => {
        Utilify.isNumber([]).should.equal(false);
        done();
      });
      it('is Number function false', (done) => {
        Utilify.isNumber(() => { }).should.equal(false);
        done();
      });
    });

    describe('Function', () => {
      it('is Function 5 true', (done) => {
        Utilify.isFunction(() => { }).should.equal(true);
        done();
      });
      it('is Function NaN false', (done) => {
        Utilify.isFunction('a5' * 5).should.equal(false);
        done();
      });
      it('is Function object false', (done) => {
        Utilify.isFunction({}).should.equal(false);
        done();
      });
      it('is Function boolean false', (done) => {
        Utilify.isFunction(true).should.equal(false);
        done();
      });
      it('is Function string false', (done) => {
        Utilify.isFunction('[]').should.equal(false);
        done();
      });
      it('is Function array false', (done) => {
        Utilify.isFunction([]).should.equal(false);
        done();
      });
      it('is Function number false', (done) => {
        Utilify.isFunction(10).should.equal(false);
        done();
      });
    });

    describe('String', () => {
      it('is Function 5 true', (done) => {
        Utilify.isString('abc').should.equal(true);
        done();
      });
      it('is Function NaN false', (done) => {
        Utilify.isString('a5' * 5).should.equal(false);
        done();
      });
      it('is Function object false', (done) => {
        Utilify.isString({}).should.equal(false);
        done();
      });
      it('is Function boolean false', (done) => {
        Utilify.isString(true).should.equal(false);
        done();
      });
      it('is Function function false', (done) => {
        Utilify.isString(() => { }).should.equal(false);
        done();
      });
      it('is Function array false', (done) => {
        Utilify.isString([]).should.equal(false);
        done();
      });
      it('is Function number false', (done) => {
        Utilify.isString(10).should.equal(false);
        done();
      });
    });

    describe('Boolean', () => {
      it('is Boolean 5 true', (done) => {
        Utilify.isBoolean(true).should.equal(true);
        done();
      });
      it('is Boolean NaN false', (done) => {
        Utilify.isBoolean('a5' * 5).should.equal(false);
        done();
      });
      it('is Boolean object false', (done) => {
        Utilify.isBoolean({}).should.equal(false);
        done();
      });
      it('is Boolean string false', (done) => {
        Utilify.isBoolean('true').should.equal(false);
        done();
      });
      it('is Boolean function false', (done) => {
        Utilify.isBoolean(() => { }).should.equal(false);
        done();
      });
      it('is Boolean array false', (done) => {
        Utilify.isBoolean([]).should.equal(false);
        done();
      });
      it('is Boolean number false', (done) => {
        Utilify.isBoolean(10).should.equal(false);
        done();
      });
    });
  });
});