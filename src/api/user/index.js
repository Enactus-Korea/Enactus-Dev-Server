'use strict';

import { createUser, allUsers, login, isFetchedLogInUser, isModifiedIntro,isPushProjects, isGetProjects } from './user.controller';  //getUser,
import router from 'koa-router';

const user = router();

user.get('/', allUsers);
user.post('/', createUser);
// user.post('/getUser', getUser);
user.post('/login', login)
user.get('/isFetched/:email', isFetchedLogInUser)
user.put('/setting/intro/:email', isModifiedIntro)
user.put('/projects/:_id', isPushProjects)
user.get('/projects/:_id', isGetProjects)

export default user;
