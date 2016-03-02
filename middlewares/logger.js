'use strict';

const log = require('./log');

module.exports = function* (next) {
  const start = Date.now();
  yield next;
  const ms = Date.now() - start;
  log.info(`${this.method} ${this.url} - ${ms}ms`);
};