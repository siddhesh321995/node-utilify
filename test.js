const should = require('should');
const assert = require('assert');
const Utilify = require('./index');

describe('Node/JS Utilify', () => {
  describe('Is Functions', () => {
    describe('Array', () => {
      it('isArray', (done) => {
        Utilify.isArray([]).should.equal(true);
        Utilify.isArray({}).should.equal(false);
        Utilify.isArray(true).should.equal(false);
        Utilify.isArray('[]').should.equal(false);
        Utilify.isArray(10).should.equal(false);
        Utilify.isArray(() => { }).should.equal(false);
        done();
      });
    });

    describe('Number', () => {
      it('isNumber', (done) => {
        Utilify.isNumber(5).should.equal(true);
        Utilify.isNumber('a5' * 5).should.equal(true);
        Utilify.isNumber({}).should.equal(false);
        Utilify.isNumber(true).should.equal(false);
        Utilify.isNumber('[]').should.equal(false);
        Utilify.isNumber([]).should.equal(false);
        Utilify.isNumber(() => { }).should.equal(false);
        done();
      });
    });

    describe('Function', () => {
      it('isFunction', (done) => {
        Utilify.isFunction(() => { }).should.equal(true);
        Utilify.isFunction('a5' * 5).should.equal(false);
        Utilify.isFunction({}).should.equal(false);
        Utilify.isFunction(true).should.equal(false);
        Utilify.isFunction('[]').should.equal(false);
        Utilify.isFunction([]).should.equal(false);
        Utilify.isFunction(10).should.equal(false);
        done();
      });
    });

    describe('String', () => {
      it('is Function 5 true', (done) => {
        Utilify.isString('abc').should.equal(true);
        Utilify.isString('a5' * 5).should.equal(false);
        Utilify.isString({}).should.equal(false);
        Utilify.isString(true).should.equal(false);
        Utilify.isString(() => { }).should.equal(false);
        Utilify.isString([]).should.equal(false);
        Utilify.isString(10).should.equal(false);
        done();
      });
    });

    describe('Boolean', () => {
      it('is Boolean 5 true', (done) => {
        Utilify.isBoolean(true).should.equal(true);
        Utilify.isBoolean('a5' * 5).should.equal(false);
        Utilify.isBoolean({}).should.equal(false);
        Utilify.isBoolean('true').should.equal(false);
        Utilify.isBoolean(() => { }).should.equal(false);
        Utilify.isBoolean([]).should.equal(false);
        Utilify.isBoolean(10).should.equal(false);
        done();
      });
    });
  });

  describe('Util functions', () => {
    it('EnumGenerator', (done) => {
      const enumObj = Utilify.EnumGenerator({ 1: 'Yes', 2: 'No' });
      enumObj[1].should.equal('Yes');
      enumObj[2].should.equal('No');
      enumObj['Yes'].should.equal(1);
      enumObj['No'].should.equal(2);
      done();
    });
    it('getCurrentEpochTime', (done) => {
      const enumObj = Utilify.getCurrentEpochTime();
      (typeof enumObj == 'number').should.equal(true);
      done();
    });
    it('CacheMgr', (done) => {
      Utilify.CacheMgr.set('key', 10);
      Utilify.CacheMgr.get('key').should.equal(10);
      Utilify.CacheMgr.remove('key');
      should.equal(Utilify.CacheMgr.get('key'), void 0);
      Utilify.CacheMgr.set('key1', 10);
      Utilify.CacheMgr.set('key2', 20);
      Utilify.CacheMgr.clearAll();
      should.equal(Utilify.CacheMgr.get('key1'), void 0);
      should.equal(Utilify.CacheMgr.get('key2'), void 0);
      done();
    });
    it('copy', (done) => {
      var a = {};
      var b = { a: 10 };
      Utilify.copy(a, b);
      a.a.should.equal(10);
      assert.notStrictEqual(a, b);
      done();
    });
    it('deepCopy', (done) => {
      var a = {};
      var b = { a: 10 };
      b['c'] = b;
      Utilify.deepCopy(a, b);
      a.a.should.equal(10);
      assert.notStrictEqual(a, b);
      done();
    });
    it('clone', (done) => {
      var b = { a: 10 };
      b['c'] = b;
      var a = Utilify.clone(b);
      assert.notStrictEqual(a, b);
      done();
    });
    it('defaultsGenerator', (done) => {
      var def = Utilify.defaultsGenerator({
        id: 0,
        name: 'abc'
      });
      var vals = def({ name: 'sid' });
      vals.name.should.equal('sid');
      vals.id.should.equal(0);

      var vals2 = def({ id: 1 });
      vals2.name.should.equal('abc');
      vals2.id.should.equal(1);
      done();
    });
    it('argumentsToArray', function (done) {
      var func = function () {
        var arr = Utilify.argumentsToArray(arguments);
        Array.isArray(arr).should.equal(true);
        arr[0].should.equal(1);
        arr[1].should.equal(2);
        done();
      };
      func(1, 2);
    });
    it('removeDuplicates', (done) => {
      var arr = Utilify.removeDuplicates([2, 2, 2]);
      arr.length.should.equal(1);
      arr[0].should.equal(2);

      var arr = Utilify.removeDuplicates([2, 2, 2, 3, 3]);
      arr.length.should.equal(2);
      arr[0].should.equal(2);
      arr[1].should.equal(3);
      done();
    });
    it('EventManager', (done) => {
      var obj1 = { a: 10 };
      var obj2 = { b: 20 };
      var data = { eve: 'Util' };
      var data2 = { eve: 'Util2' };
      var respFunc = (resp) => {
        resp.should.equal(data);
      };
      var resp2Func = (resp) => {
        resp.should.equal(data2);
      };
      var arr = Utilify.EventManager.listenTo(obj1, 'Util', respFunc);
      Utilify.EventManager.trigger(obj1, 'Util', data);
      Utilify.EventManager.off(obj1, 'Util', respFunc);
      Utilify.EventManager.trigger(obj1, 'Util', {});
      Utilify.EventManager.once(obj2, 'Util', resp2Func);
      Utilify.EventManager.trigger(obj1, 'Util', data2);
      Utilify.EventManager.trigger(obj1, 'Util', {});
      done();
    });
    it('Ajax', (done) => {
      should.equal(typeof Utilify.Ajax.put == 'function', true);
      should.equal(typeof Utilify.Ajax.get == 'function', true);
      should.equal(typeof Utilify.Ajax.post == 'function', true);
      should.equal(typeof Utilify.Ajax.delete == 'function', true);
      done();
    });
  });
});
