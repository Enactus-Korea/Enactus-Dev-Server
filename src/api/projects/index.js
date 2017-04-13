'use strict';

import {
  createProject,
  getProjects,
  isUnivProjects,
  isPortionOfNeeds
} from './projects.controller';
import router from 'koa-router';


const projects = router();

projects.post('/', createProject);
projects.get('/', getProjects);
projects.get('/:univ', isUnivProjects);
projects.get('/needs/:needs', isPortionOfNeeds);


export default projects;
