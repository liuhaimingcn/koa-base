'use strict';

const request = require('./request');
const config = require('../config');

module.exports = function* () {
  let backUrl = config.api_server + this.request.originalUrl;
  let method = this.request.method.toLowerCase();
  let params = (method === 'get' || method === 'delete') ? this.request.query : this.request.body;
  this.body = yield request[method](backUrl, params);
};