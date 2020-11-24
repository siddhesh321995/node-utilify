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
   * @param {(data: any) => undefined} onSuccess Optional, success callback for put operation.
   * @param {(data: any) => undefined} onFail Optional, error callback for put operation.
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
   * @param {(data: any) => undefined} onSuccess Optional, success callback for put operation.
   * @param {(data: any) => undefined} onFail Optional, error callback for put operation.
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
   * @param {(data: any) => undefined} onSuccess Optional, success callback for put operation.
   * @param {(data: any) => undefined} onFail Optional, error callback for put operation.
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
   * @param {(data: any) => undefined} onSuccess Optional, success callback for put operation.
   * @param {(data: any) => undefined} onFail Optional, error callback for put operation.
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
