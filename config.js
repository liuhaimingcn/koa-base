'use strict';

const ISPRODUCTION = process.env.NODE_ENV === 'production';

let config = {
  port: 4000,
  isProduction: ISPRODUCTION,
  sessionSecret: 'hello',
  staticServerMaxAge: ISPRODUCTION ? 2592000000 : 0,//ms,一个月
  qiniu: {
    ACCESS_KEY: '***',
    SECRET_KEY: '***',
    Bucket_Name: '***'
  },
  api_server: '***'
};

module.exports = config;

console.log(config);
