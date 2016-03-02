"use strict";

const config = require('../config');
const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: "koa-base",
  src: false,
  streams: config.isProduction ? [
    {
      level: 'info',
      path: '/usr/local/logs/info.log'
    },
    {
      level: 'error',
      path: '/usr/local/logs/error.log'
    }
  ] : [
    {
      level: 'info',
      stream: process.stdout
    }
  ],
  level: config.isProduction ? 'info' : 'debug'
});