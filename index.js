const UUID_NIL = '00000000-0000-0000-0000-000000000000';

/**
 * Generates a Enum class
 * @param {{[key:number]:string}} attr Valid enum data
 */
const EnumGenerator = (attr) => {
  for (var key in attr) {
    if (attr.hasOwnProperty(key)) {
      attr[attr[key]] = key;
    }
  }
  return attr;
};

/**
 * Returns current epoch time in int.
 */
const getCurrentEpochTime = () => {
  const dateObj = new Date();
  return parseInt((dateObj).getTime() / 1000);
};

let _cache = {};

/**
 * Cache manager, stores data in memory.
 */
const CacheMgr = {
  /**
   * Sets cache value
   * @param {string} key Key of the value
   * @param {any} val Cached value
   */
  set: (key, val) => {
    return _cache[key] = val;
  },
  /**
   * Gets cached value
   * @param {string} key Key of the value
   */
  get: (key) => _cache[key],
  /**
   * Removes given cached value
   * @param {string} key Key of the value
   */
  remove: (key) => {
    delete _cache[key];
  },
  /**
   * Removes all cached values.
   */
  clearAll: () => {
    _cache = {};
  }
};

/**
 * Copies all properties from data to copy object.
 * @param {any} copy Target object.
 * @param {any} data Source object.
 */
const copy = (copy, data) => {
  return data = Object.assign(copy, data);
};

/**
 * Deep clones all properties from data to copy object.
 * @param {any} copy Target object.
 * @param {any} data Source object.
 */
const deepCopy = (copy, data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Same reference break
      if (data[key] == data) {
        return data;
      }
      if (typeof data[key] == 'object') {
        copy[key] = deepCopy({}, data[key]);
      } else {
        copy[key] = data[key];
      }
    }
  }
  return data;
};

const clone = (data) => {
  return deepCopy({}, data);
};

const defaultsGenerator = (attr = {}) => {
  return (data) => {
    return copy(data, attr);
  };
};

/**
 * Manges events.
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

const isNumber = (item) => { return typeof item == 'number'; };

const isFunction = (item) => { return typeof item == 'function'; };

const isString = (item) => { return typeof item == 'string'; };

const isBoolean = (item) => { return typeof item == 'boolean'; };

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
* @return     {Array<any>}  Duplicates removed array.
*/
var removeDuplicates = function (arr) {
  var retArr = [];
  arr.forEach(function (elem) {
    if (!retArr.indexOf(elem) != -1) {
      retArr.push(elem);
    }
  });
  return retArr;
};

const Utilify = {
  UUID_NIL, EnumGenerator, getCurrentEpochTime, CacheMgr, clone, deepCopy, copy, defaultsGenerator,
  EventManager,
  isNumber, isFunction, isString, isBoolean, isArray,
  argumentsToArray, removeDuplicates
};

if (typeof module != void 0) {
  module.exports = Utilify;
} else if (typeof window != void 0) {
  window.Utilify = Utilify;
}