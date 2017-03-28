'use strict';

import config from './config';
import configRoutes from './config/routes';
import Koa from 'koa';
import configKoa from './config/koa';
// import mongoose from 'mongoose'
// import autoIncrement from 'mongoose-auto-increment'

const app = new Koa(); //이게 서버가 되지롱~
app.port = config.port;  //포트 설정

// mongoose.connect(config.database)
// var db = mongoose.connection;
// autoIncrement.initialize(db);
// db.on('error', function(e) {
//   console.error(e);
// });
// db.once('open', function() {
//   console.log('connected to ' + config.database);
// });

configKoa(app);
configRoutes(app);

// app.listen(config.port, () => {
//   console.log(`Server started on ${config.port}`)
// })

export default app;
