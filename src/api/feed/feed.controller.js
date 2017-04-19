import Feed from './feed.model'
import config from '../../config/env/common'
import fs from 'fs';
import AWS from 'aws-sdk'
AWS.config.update({
  accessKeyId: 'AKIAI66LJP4T2JKWSFVA',
  secretAccessKey: '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'
});

let s3 = new AWS.S3({
  signatureVersion: 'v4'
});
const myBucket = 'leeyu823';

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

export async function incLike(ctx) {
  const feed = ctx.request.body;
  await Feed.findByIdAndUpdate({_id: feed._id},{$push: {"likes": feed.userId}});
  // console.log("아이디 배열에 추가추가");
}

export async function decLike(ctx) {
  // const feed = new Feed(ctx.request.body);
  // const data = await Feed.findOne({_id: feed._id});
  // console.log(data);
  // const decCount = data.likes - 1;
  //await Feed.update({_id: feed._id}, {likes: decCount});
  console.log(ctx.request.body);
  const feed = ctx.request.body;
  await Feed.findByIdAndUpdate({_id: feed._id},{$pull: {"likes": feed.userId}});
  console.log("감소감소");
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
