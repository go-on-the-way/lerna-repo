/* * Copyright © 2020-2021 wlei 
* Released under the ISC License. 
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['axios', 'qs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.http = factory(global.axios, global.qs));
}(this, (function (axios, qs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

  var http = axios__default['default'].create({
    baseURL: 'http://beta.srm.starlinke.cn/api/v1',
    //
    timeout: 5 * 60 * 1000 // 请求超时时间5分钟

  });
  http.interceptors.request.use(function (config) {
    if (['get', 'delete'].includes(config.method)) {
      config.paramsSerializer = function (params) {
        return qs__default['default'].stringify(params, {
          arrayFormat: 'repeat'
        });
      };
    }

    return config;
  }, function (error) {
    Promise.reject(error);
  });
  http.interceptors.response.use(function (response) {
    var _ref = response.data || {},
        error = _ref.error;

    if (error) {
      switch (error.code) {
            }
    }

    return response.data;
  }, function (error) {
    var response = error.response;
        error.config;
    String(error).indexOf('timeout') > -1;

    return Promise.reject(response);
  });

  return http;

})));
