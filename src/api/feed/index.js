'use strict';

import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  incLike,
  decLike,
  createFeedComment,
  getFeedComment,
  getBambooFeeds
} from './feed.controller';
import router from 'koa-router';


const feed = router();

feed.post('/', createFeed);
feed.get('/', getFeeds);
feed.post('/incLike', incLike);
feed.post('/decLike', decLike);
feed.put('/:id/comment', createFeedComment);
feed.get('/:id/comment', getFeedComment);
feed.get('/bamboo', getBambooFeeds);


export default feed;
