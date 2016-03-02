"use strict";

const request = require('superagent');
const config = require('../config');
const log = require('./log');

['get', 'del', 'post', 'put'].forEach(function (method) {
  exports[method] = function (path, data) {
    return new Promise((resolve, reject) => {
      request[method](path)
        .type('json').timeout(10000)
        .accept('json')[~['get', 'del'].indexOf(method) ? 'query' : 'send'](data)
        .end(function (err, res) {
          if (err || res.body.status !== 200) {
            if (!err) {
              err = new Error('API ERORR!');
              err.status = res.body.status || 500;
            }
            return reject(err);
          }

          return resolve(res.body.data);
        });
    });
  }
});