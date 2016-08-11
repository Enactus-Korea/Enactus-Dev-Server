require('babel-register');
require('babel-polyfill');
const config = require('./src/config');
const app = require('./src/server');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(config.dev.endb);
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', function(e) {
  console.error(e);
});
db.once('open', function() {
  console.log('connected to ' + config.dev.endb);
});

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
// Check for module parent and export app, otherwise app.listen()
// This is so that it is easy to test application or use it with clustering
if (!module.parent) {
  app.listen(config.dev.port, config.dev.ip, () => {
    console.log(`Koa server listening on ${config.dev.port}, in ${config.dev.env} mode`);
  });
} else {
  module.exports = app;
}
