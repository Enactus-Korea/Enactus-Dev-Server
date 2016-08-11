'use strict';

const path = require('path');

const config = {
  "dev" : {
    type: 'development',
    env: process.env.NODE_ENV || 'dev',
    root: path.normalize(__dirname + '../../'),
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 9000,
    logType: process.env.LOGTYPE || 'dev',
    endb: 'mongodb://localhost:27017/enactus',
    push: ''
  },
  "production": {
    type: 'production',
    push: '',
    endb:  'mongodb://localhost:27017/enactus',
    port: 40001
  }
};

module.exports = config;
