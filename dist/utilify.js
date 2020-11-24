(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * @module
 * Helpful Wrapper module to interact and connect with any RESTful API.
 * Has dependency on Promise and XMLHttpRequest classes in ES5/ES6.
 * Can work with polyfilled Promise class.
 */
var Ajax = {
  /**
   * PUT Request, generally used for adding new record in the database. Uses XMLHttpRequest to make an xhr call.
   * @static
   * @public
   *
   * @param {string} url URL for given request.
   * @param {Object} data object payload to be sent to server.
   * @param {Function} onSuccess Optional, success callback for put operation.
   * @param {Function} onFail Optional, error callback for put operation.
   * @returns {Promise<any>} Promise with response
   * @example Ajax.put('//google.com').then(...).catch(...);
   */
  put: function put(url, data, onSuccess, onFail) {
    return new Promise(function (res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        var data = xhr.responseText;
        if (xhr.readyState == 4 && xhr.status == "200") {
          typeof onSuccess == "function" && onSuccess(data);
          typeof res == "function" && res(data);
        } else {
          typeof onFail == "function" && onFail(data);
          typeof rej == "function" && rej(data);
        }
      };
      xhr.send(JSON.stringify(data));
    });
  },

  /**
   * GET Request, generally used to fetch items. Uses XMLHttpRequest to make an xhr call.
   * @static
   * @public
   *
   * @param {string} url URL for given request.
   * @param {Function} onSuccess Optional, success callback for put operation.
   * @param {Function} onFail Optional, error callback for put operation.
   * @returns {Promise<any>} Promise with response
   * @example Ajax.get('//google.com/users').then(...).catch(...);
   */
  get: function get(url, onSuccess, onFail) {
    return new Promise(function (res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        var data = xhr.responseText;
        if (xhr.readyState == 4 && xhr.status == "200") {
          typeof onSuccess == "function" && onSuccess(data);
          typeof res == "function" && res(data);
        } else {
          typeof onFail == "function" && onFail(data);
          typeof rej == "function" && rej(data);
        }
      };
      xhr.send(null);
    });
  },

  /**
   * POST Request, generally used to update items in the database. Uses XMLHttpRequest to make an xhr call.
   * @static
   * @public
   *
   * @param {string} url URL for given request.
   * @param {Object} data object payload to be sent to server.
   * @param {Function} onSuccess Optional, success callback for put operation.
   * @param {Function} onFail Optional, error callback for put operation.
   * @returns {Promise<any>} Promise with response
   * @example Ajax.post('//google.com/users').then(...).catch(...);
   */
  post: function post(url, data, onSuccess, onFail) {
    return new Promise(function (res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        var data = xhr.responseText;
        if (xhr.readyState == 4 && xhr.status == "200") {
          typeof onSuccess == "function" && onSuccess(data);
          typeof res == "function" && res(data);
        } else {
          typeof onFail == "function" && onFail(data);
          typeof rej == "function" && rej(data);
        }
      };
      xhr.send(JSON.stringify(data));
    });
  },

  /**
   * DELETE Request, generally used to remove/delete items from the database. Uses XMLHttpRequest to make an xhr call.
   * @static
   * @public
   * 
   * @param {string} url URL for given request.
   * @param {Object} data object payload to be sent to server.
   * @param {Function} onSuccess Optional, success callback for put operation.
   * @param {Function} onFail Optional, error callback for put operation.
   * @returns {Promise<any>} Promise with response
   * @example Ajax.delete('//google.com/users').then(...).catch(...);
   */
  delete: function _delete(url, data, onSuccess, onFail) {
    return new Promise(function (res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        var data = xhr.responseText;
        if (xhr.readyState == 4 && xhr.status == "200") {
          typeof onSuccess == "function" && onSuccess(data);
          typeof res == "function" && res(data);
        } else {
          typeof onFail == "function" && onFail(data);
          typeof rej == "function" && rej(data);
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }
};

if (typeof module != "undefined") {
  module.exports = Ajax;
}
if (typeof window != "undefined") {
  window.Ajax = Ajax;
}
},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Ajax = require('./ajax');

/**
 * @typedef {{[key:number]:string}} EnumInput
 * @interface
 * @private
 */

var enumInput = {};

/**
 * @typedef {{[key:number]:string, [key:string]:number}} JSEnum
 * @interface
 * @private
 */

var jSEnum = {};

/**
 * Null value for uuid.
 * Database type is uuid/guid.
 * Value is '00000000-0000-0000-0000-000000000000'
 * 
 * @static
 */
var UUID_NIL = '00000000-0000-0000-0000-000000000000';

/**
 * Generates a Enum class
 * @param {EnumInput} attr Valid enum data
 * @returns {JSEnum} JavaScript compatible enum class.
 * @example
 * const enumObj = Utilify.EnumGenerator({ 1: 'Yes', 2: 'No' });
 * enumObj[1] // 'Yes'
 * enumObj['Yes'] // 1
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
 * @returns {number} current time in epoch format
 */
var getCurrentEpochTime = function getCurrentEpochTime() {
  var dateObj = new Date();
  return parseInt(dateObj.getTime() / 1000);
};

var _cache = {};

/**
 * Cache manager, stores data in memory.
 * @class CacheMgr
 * @module CacheMgr module
 * @example 
 * CacheMgr.set('key1', 1000);
 * CacheMgr.get('key1'); // 1000
 * CacheMgr.remove('key1');
 */
var CacheMgr = {
  /**
   * Sets cache value
   * @param {string} key Key of the value
   * @param {T} val Cached value
   * @returns {T} Cached value.
   * @example CacheMgr.set('key', 1000);
   */
  set: function set(key, val) {
    return _cache[key] = val;
  },
  /**
   * Gets cached value
   * @param {string} key Key of the value
   * @returns {any} Cached value.
   * @example CacheMgr.get('key');
   */
  get: function get(key) {
    return _cache[key];
  },
  /**
   * Removes given cached value
   * @param {string} key Key of the value
   * @returns {undefined} undefined.
   * @example CacheMgr.remove('key');
   */
  remove: function remove(key) {
    delete _cache[key];
  },
  /**
   * Removes all cached values.
   * @returns {undefined} undefined.
   * @example CacheMgr.clearAll();
   */
  clearAll: function clearAll() {
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
var copy = function copy(_copy, data) {
  data = Object.assign(_copy, data);
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
 * @param {T} data Source object.
 * @returns {T} copied object.
 * @example clone({}, {a:{b:{c:10}}}); // {a:{b:{c:10}}}
 */
var clone = function clone(data) {
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
 * @returns {boolean}
 * @example var myVar = 10; isNumber(myVar); // true
 */
var isNumber = function isNumber(item) {
  return typeof item == 'number';
};

/**
 * Returns true if parameter is function.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = "str"; isFunction(myVar); // false
 */
var isFunction = function isFunction(item) {
  return typeof item == 'function';
};

/**
 * Returns true if parameter is string.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = "str"; isString(myVar); // true
 */
var isString = function isString(item) {
  return typeof item == 'string';
};

/**
 * Returns true if parameter is boolean.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = 10; isBoolean(myVar); // false
 */
var isBoolean = function isBoolean(item) {
  return typeof item == 'boolean';
};

/**
 * Returns true if parameter is an array.
 * @param {any} item parameter to check.
 * @returns {boolean}
 * @example var myVar = []; isArray(myVar); // true
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
 * @example
 * function myFunc1() {
 *  myFunc2.apply(this, argumentsToArray(arguments).push(10));
 * }
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
 * @param      {Array<T>}  arr    Array with items of type T, having duplicate items
 * @return     {Array<T>}  Array without duplicate items.
 * @example
 * removeDuplicates([10,10,20,20,20,30]); // [10,20,30]
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
},{"./ajax":1}]},{},[2]);
