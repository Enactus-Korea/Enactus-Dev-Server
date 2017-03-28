'use strict';

import {
  createPermission,
  getPermissions
} from './permission.controller';
import router from 'koa-router';


const permission = router();

permission.post('/', createPermission);
permission.get('/', getPermissions);


export default permission;
