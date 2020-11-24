const Ajax = require('./ajax');

/**
 * @typedef {{[key:number]:string}} EnumInput
 * @interface
 * @private
 */

const enumInput = {};

/**
 * @typedef {{[key:number]:string, [key:string]:number}} JSEnum
 * @interface
 * @private
 */

const jSEnum = {};

/**
 * Null value for uuid.
 * Database type is uuid/guid.
 * Value is '00000000-0000-0000-0000-000000000000'
 * 
 * @static
 */
const UUID_NIL = '00000000-0000-0000-0000-000000000000';

/**
 * Generates a Enum class
 * @param {EnumInput} attr Valid enum data
 * @returns {JSEnum} JavaScript compatible enum class.
 * @example
 * const enumObj = Utilify.EnumGenerator({ 1: 'Yes', 2: 'No' });
 * enumObj[1] // 'Yes'
 * enumObj['Yes'] // 1
 */
const EnumGenerator = (attr) => {
  for (var key in attr) {
    if (attr.hasOwnProperty(key)) {
      if (!isNaN(Number(key))) {
        attr[attr[key]] = Number(key);
      } else {
        attr[attr[key]] = key;
      }
    }
  }
  return attr;
};

/**
 * Returns current epoch time in int.
 * @returns {number} current time in epoch format
 */
const getCurrentEpochTime = () => {
  const dateObj = new Date();
  return parseInt((dateObj).getTime() / 1000);
};

let _cache = {};

/**
 * Cache manager, stores data in memory.
 * @class CacheMgr
 * @module CacheMgr module
 * @example 
 * CacheMgr.set('key1', 1000);
 * CacheMgr.get('key1'); // 1000
 * CacheMgr.remove('key1');
 */
const CacheMgr = {
  /**
   * Sets cache value
   * @param {string} key Key of the value
   * @param {T} val Cached value
   * @returns {T} Cached value.
   * @example CacheMgr.set('key', 1000);
   */
  set: (key, val) => {
    return _cache[key] = val;
  },
  /**
   * Gets cached value
   * @param {string} key Key of the value
   * @returns {any} Cached value.
   * @example CacheMgr.get('key');
   */
  get: (key) => _cache[key],
  /**
   * Removes given cached value
   * @param {string} key Key of the value
   * @returns {undefined} undefined.
   * @example CacheMgr.remove('key');
   */
  remove: (key) => {
    delete _cache[key];
  },
  /**
   * Removes all cached values.
   * @returns {undefined} undefined.
   * @example CacheMgr.clearAll();
   */
  clearAll: () => {
    _cache = {};
  }
};

/**
 * Copies all properties from data to copy object.
 * 
 * @param {Object} copy Target object.
 * @param {Object} data Source object.
 * @returns {Object} copied object.
 * @example deepCopy({}, {a:10}); // {a:10}
 */
const copy = (copy, data) => {
  data = Object.assign(copy, data);
  return data;
};

/**
 * Deep clones all properties from data to copy object.
 * 
 * @param {Object} copy Target object.
 * @param {Object} data Source object.
 * @returns {Object} copied object.
 * @example deepCopy({}, {a:{b:{c:10}}}); // {a:{b:{c:10}}}
 */
const deepCopy = (copy, data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Same reference break
      if (data[key] == data) {
        copy[key] = data;
        return copy;
      }
      if (typeof data[key] == 'object') {
        copy[key] = deepCopy({}, data[key]);
      } else {
        copy[key] = data[key];
      }
    }
  }
  return copy;
};

/**
 * Returns clonned object from given object
 * @param {T} data Source object.
 * @returns {T} copied object.
 * @example clone({}, {a:{b:{c:10}}}); // {a:{b:{c:10}}}
 */
const clone = (data) => {
  return deepCopy({}, data);
};

/**
 * Generator function for defaults in a class constructor.
 * @param {Object} attr Default Object attribute
 * @example
 * var def = Utilify.defaultsGenerator({
 *   id: 0,
 *   name: 'abc'
 * });
 * var vals = def({ name: 'sid' });
 */
const defaultsGenerator = (attr = {}) => {
  return (data) => {
    return Object.assign({}, attr, data);
  };
};

/**
 * Custom event manager.
 * Scope based.
 *
 * @class      EventManager (name)
 * @example
 * var arr = EventManager.listenTo(obj1, 'Util', respFunc);
 * EventManager.trigger(obj1, 'Util', data);
 * EventManager.off(obj1, 'Util', respFunc);
 */
var EventManager = {};
var _handlers = [];

/**
 * Adds an event listener on given context with given event name and callback.
 *
 * @param      {Object}    context    The context
 * @param      {string}    eventName  The event name
 * @param      {Function}  callback   The callback
 */
EventManager.listenTo = function (context, eventName, callback) {
  _handlers.push({ "eventName": eventName, "context": context, "callback": callback });
};

/**
 * Adds an event listener on given context with given event name and callback but removes when once executed.
 *
 * @param      {Object}    context    The context
 * @param      {string}    eventName  The event name
 * @param      {Function}  callback   The callback
 */
EventManager.once = function (context, eventName, callback) {
  var newCb = (function (data) {
    callback(data);
    EventManager.off(context, eventName, newCb);
  }).bind(this);
  _handlers.push({ "eventName": eventName, "context": context, "callback": newCb });
};

/**
 * Triggers given event on given context with data.
 *
 * @param      {Object}  context    The context
 * @param      {string}  eventName  The event name
 * @param      {ANY}     data       The data
 */
EventManager.trigger = function (context, eventName, data) {
  _handlers.forEach(function (item, index) {
    if (item.eventName === eventName && item.context === context) {
      item.callback(data);
    }
  });
};

/**
 * Removes an event listener if no callback provided, all events will be removed on context with given event.
 *
 * @param      {Object}    context    The context
 * @param      {string}    eventName  The event name
 * @param      {Function}  callback   The callback (optional)
 */
EventManager.off = function (context, eventName, callback) {
  for (var i = 0; i < _handlers.length; i++) {
    var item = _handlers[i];
    if (callback === void 0) {
      if (item.eventName === eventName && item.context === context) {
        _handlers.splice(i, 1);
        i--;
      }
    } else {
      if (item.eventName === eventName && item.context === context && item.callback === callback) {
        _handlers.splice(i, 1);
        i--;
      }
    }
  }
};

/**
 * Returns true if parameter is number.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = 10; isNumber(myVar); // true
 */
const isNumber = (item) => { return typeof item == 'number'; };

/**
 * Returns true if parameter is function.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = "str"; isFunction(myVar); // false
 */
const isFunction = (item) => { return typeof item == 'function'; };

/**
 * Returns true if parameter is string.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = "str"; isString(myVar); // true
 */
const isString = (item) => { return typeof item == 'string'; };

/**
 * Returns true if parameter is boolean.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = 10; isBoolean(myVar); // false
 */
const isBoolean = (item) => { return typeof item == 'boolean'; };

/**
 * Returns true if parameter is an array.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = []; isArray(myVar); // true
 */
const isArray = (item) => {
  if (typeof Array.isArray == 'function') {
    return Array.isArray(item);
  } else {
    return item instanceof Array;
  }
};

/**
 * Converts type arguments into array, with same values
 *
 * @param      {argument}  args    The arguments
 * @return     {Array<any>}      Array type arguments
 * @example
 * function myFunc1() {
 *  myFunc2.apply(this, argumentsToArray(arguments).push(10));
 * }
 */
var argumentsToArray = function (args) {
  var retArr = [];
  for (var i = 0; i < args.length; i++) {
    retArr.push(args[i]);
  }
  return retArr;
};

/**
 * Removes duplicates elements in array.
 *
 * @param      {Array<T>}  arr    Array with items of type T, having duplicate items
 * @return     {Array<T>}  Array without duplicate items.
 * @example
 * removeDuplicates([10,10,20,20,20,30]); // [10,20,30]
 */
var removeDuplicates = function (arr) {
  var retArr = [];
  arr.forEach(function (elem) {
    if (retArr.indexOf(elem) == -1) {
      retArr.push(elem);
    }
  });
  return retArr;
};

const Utilify = {
  UUID_NIL, EnumGenerator, getCurrentEpochTime, CacheMgr, clone, deepCopy, copy, defaultsGenerator,
  EventManager,
  isNumber, isFunction, isString, isBoolean, isArray,
  argumentsToArray, removeDuplicates, Ajax
};

if (typeof module != "undefined") {
  module.exports = Utilify;
}
if (typeof window != "undefined") {
  window.Utilify = Utilify;
}
