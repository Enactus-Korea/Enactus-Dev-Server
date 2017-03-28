'use strict';

import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  incLike,
  decLike,
  addComment
} from './feed.controller';
import router from 'koa-router';


const feed = router();

feed.post('/', createFeed);
feed.get('/', getFeeds);
feed.post('/incLike', incLike);
feed.post('/decLike', decLike);
feed.post('/addComment', addComment);


export default feed;
