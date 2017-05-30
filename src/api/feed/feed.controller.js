import Feed from './feed.model'
import config from '../../config/env/common'
import fs from 'fs';
import AWS from 'aws-sdk'
AWS.config.update({
  accessKeyId: 'AKIAJTTKJDDHBP6VA3TQ',
  secretAccessKey: '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'
});

let s3 = new AWS.S3({
  signatureVersion: 'v4'
});
const myBucket = 'enactuskorea';

export async function createFeed(ctx, next) {
  let fields = ctx.request.body.fields,
      files = ctx.request.body.files,
      feed = new Feed(fields);
      console.log(files)
  if(files.postImg){
    const fileName = feed._id.toString();
    const fileType = files.postImg.type;
    const s3Params = {
      Bucket: myBucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
      Body: fs.createReadStream(files.postImg.path)
    };

    let ret = await s3.upload(s3Params).promise();
    feed.postImg = ret.Location;
  }

  feed.save();
  ctx.body = feed;
}

export async function getFeeds(ctx) {
  const feed = await Feed.find().sort({createdOn: -1})
  ctx.body = { feed }
}

export async function getBambooFeeds(ctx) {
  const feed = await Feed.find({typeOf: '대나무숲'}).sort({createdOn: -1})
  ctx.body = { feed }
}

export async function handleLike(ctx) {
  const feed = ctx.request.body;
  let existId = await Feed.findOne({_id: feed.feedId}).select('likes')
  if(existId.likes.indexOf(feed.userId) === -1){
    console.log("add");
    await Feed.findByIdAndUpdate({_id: feed.feedId},{$push: {"likes": feed.userId}});
  } else {
    console.log("remove");
    await Feed.findByIdAndUpdate({_id: feed.feedId},{$pull: {"likes": feed.userId}});
  }
}
export async function getNumberFeedLike(ctx) {
  let feed = await Feed.findOne({_id: ctx.params.feedId}).select('likes'),
      num = feed.likes.length;
  ctx.body = num
}

// 댓글 추가
export async function createFeedComment(ctx) {
   ctx.body = await Feed.findByIdAndUpdate({_id: ctx.params.id},{$push: {"comment": ctx.request.body}});
}

export async function getFeedComment(ctx) {
  ctx.body = await Feed.findOne({_id: ctx.params.id}).select('comment')
}


export async function deleteFeed(ctx) {
  const feed = ctx.body

  await feed.remove()

  ctx.status = 200
  ctx.body = {
    success: true
  }
}
