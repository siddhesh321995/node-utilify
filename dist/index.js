'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Ajax = require('./ajax');

/**
 * Null value for uuid
 */
var UUID_NIL = '00000000-0000-0000-0000-000000000000';

/**
 * Generates a Enum class
 * @param {{[key:number]:string}} attr Valid enum data
 * @returns {{[key:number]:string, [key:string]:number}} attr Valid enum data
 */
var EnumGenerator = function EnumGenerator(attr) {
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
 */
var getCurrentEpochTime = function getCurrentEpochTime() {
  var dateObj = new Date();
  return parseInt(dateObj.getTime() / 1000);
};

var _cache = {};

/**
 * Cache manager, stores data in memory.
 */
var CacheMgr = {
  /**
   * Sets cache value
   * @param {string} key Key of the value
   * @param {any} val Cached value
   */
  set: function set(key, val) {
    return _cache[key] = val;
  },
  /**
   * Gets cached value
   * @param {string} key Key of the value
   */
  get: function get(key) {
    return _cache[key];
  },
  /**
   * Removes given cached value
   * @param {string} key Key of the value
   */
  remove: function remove(key) {
    delete _cache[key];
  },
  /**
   * Removes all cached values.
   */
  clearAll: function clearAll() {
    _cache = {};
  }
};

/**
 * Copies all properties from data to copy object.
 * @param {any} copy Target object.
 * @param {any} data Source object.
 */
var copy = function copy(_copy, data) {
  data = Object.assign(_copy, data);
  return data;
};

/**
 * Deep clones all properties from data to copy object.
 * @param {any} copy Target object.
 * @param {any} data Source object.
 */
var deepCopy = function deepCopy(copy, data) {
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      // Same reference break
      if (data[key] == data) {
        copy[key] = data;
        return copy;
      }
      if (_typeof(data[key]) == 'object') {
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
 * @param {any} data Source object.
 */
var clone = function clone(data) {
  return deepCopy({}, data);
};

/**
 * Generator function for defaults in a class constructor.
 * @param {any} attr Default Object attribute
 */
var defaultsGenerator = function defaultsGenerator() {
  var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (data) {
    return Object.assign({}, attr, data);
  };
};

/**
 * Custom event manager.
 * Scope based.
 *
 * @class      EventManager (name)
 * @return     {Class}  A static class / namespace
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
  var newCb = function (data) {
    callback(data);
    EventManager.off(context, eventName, newCb);
  }.bind(this);
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
 */
var isNumber = function isNumber(item) {
  return typeof item == 'number';
};

/**
 * Returns true if parameter is function.
 * @param {any} item parameter to check.
 */
var isFunction = function isFunction(item) {
  return typeof item == 'function';
};

/**
 * Returns true if parameter is string.
 * @param {any} item parameter to check.
 */
var isString = function isString(item) {
  return typeof item == 'string';
};

/**
 * Returns true if parameter is boolean.
 * @param {any} item parameter to check.
 */
var isBoolean = function isBoolean(item) {
  return typeof item == 'boolean';
};

/**
 * Returns true if parameter is an array.
 * @param {any} item parameter to check.
 */
var isArray = function isArray(item) {
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
 */
var argumentsToArray = function argumentsToArray(args) {
  var retArr = [];
  for (var i = 0; i < args.length; i++) {
    retArr.push(args[i]);
  }
  return retArr;
};

/**
* Removes duplicates elements in array.
*
* @param      {Array<any>}  arr    Array with duplicate items
* @return     {Array<any>}  Array without duplicate items.
*/
var removeDuplicates = function removeDuplicates(arr) {
  var retArr = [];
  arr.forEach(function (elem) {
    if (retArr.indexOf(elem) == -1) {
      retArr.push(elem);
    }
  });
  return retArr;
};

var Utilify = {
  UUID_NIL: UUID_NIL, EnumGenerator: EnumGenerator, getCurrentEpochTime: getCurrentEpochTime, CacheMgr: CacheMgr, clone: clone, deepCopy: deepCopy, copy: copy, defaultsGenerator: defaultsGenerator,
  EventManager: EventManager,
  isNumber: isNumber, isFunction: isFunction, isString: isString, isBoolean: isBoolean, isArray: isArray,
  argumentsToArray: argumentsToArray, removeDuplicates: removeDuplicates, Ajax: Ajax
};

if (typeof module != "undefined") {
  module.exports = Utilify;
}
if (typeof window != "undefined") {
  window.Utilify = Utilify;
}