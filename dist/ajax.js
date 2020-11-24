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