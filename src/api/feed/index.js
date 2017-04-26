'use strict';

import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  handleLike,
  createFeedComment,
  getFeedComment,
  getBambooFeeds,
  getNumberFeedLike
} from './feed.controller';
import router from 'koa-router';


const feed = router();

feed.post('/', createFeed);
feed.get('/', getFeeds);
feed.put('/handle/like', handleLike);
feed.get('/handle/like/:feedId', getNumberFeedLike);
feed.put('/:id/comment', createFeedComment);
feed.get('/:id/comment', getFeedComment);
feed.get('/bamboo', getBambooFeeds);


export default feed;
