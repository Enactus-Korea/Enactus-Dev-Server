const path = require('path');

export default {
  port: process.env.PORT || 9000,
  ip: process.env.IP || 'localhost',
  root: path.normalize(__dirname + '../../'),
  logType: process.env.LOGTYPE || 'dev',
  secret: 'argrgrwg039495963',
  // env: process.env.NODE_ENV || 'dev',
}
