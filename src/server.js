'use strict';

import config from './config';
import configRoutes from './config/routes';
import Koa from 'koa';
import configKoa from './config/koa';

const app = new Koa(); //이게 서버가 되지롱~
app.port = config.port;  //포트 설정

configKoa(app);
configRoutes(app);

export default app;
