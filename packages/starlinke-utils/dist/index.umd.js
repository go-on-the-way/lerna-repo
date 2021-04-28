/* * Copyright © 2020-2021 wlei 
* Released under the ISC License. 
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios', 'qs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.axios, global.qs));
}(this, (function (exports, axios, qs) { 'use strict';

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

  // 替换请求协议为本站相同的协议
  function getSameProtocol(url) {
    if (!url) {
      return url;
    }

    return url.replace(/^(http|https)/, window.location.protocol.split(':')[0]);
  }
  /**
  * 下载文件
  * @param {file} file 要下载的文件
  * @param {fileName} fileName  要下载的文件名
  */


  var downloadFile = function downloadFile(file, fileName) {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = getSameProtocol(file);
    link.style.display = 'hidden';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /**
   * 下载blob格式的文件
   * @param {blobData} blobData blob格式的数据源
   * @param {fileName} fileName 导出的文件名
   */

  var downloadBlobData = function downloadBlobData(blobData, fileName) {
    var url = window.URL.createObjectURL(blobData);
    downloadFile(url, fileName);
    window.URL.revokeObjectURL(url);
  };

  exports.http = http;

  exports.downloadBlobData = downloadBlobData;
  exports.downloadFile = downloadFile;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
