'use strict';

import mount from 'koa-mount'; //첫번째 인자로 주소가 들어왕
import { root, feed, user, projects, permission } from '../api';


export default function configRoutes(app) {
  app.use(mount('/feed', feed.routes()));
  app.use(mount('/user', user.routes()));
  app.use(mount('/projects', projects.routes()));
  app.use(mount('/permission', permission.routes()));
  // '/'로 주소가 들어오면 root.routes의 결과로 연결해줘~ 함수니깡
  // List Endpoints Here
}
