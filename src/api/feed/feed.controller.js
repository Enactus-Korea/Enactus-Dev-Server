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
  feed.save();
  ctx.body = ret.Location;
}

export async function getFeeds(ctx) {
  const feed = await Feed.find().sort({posted: -1})
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
export async function addComment(ctx) {
   console.log(ctx.request.boby);
   const feed = ctx.request.body;
   console.log(feed._id);
   console.log(feed.comment);
   ctx.body = await Feed.findByIdAndUpdate({_id: feed._id},{$push: {"comment": feed.comment}});
}


export async function deleteFeed(ctx) {
  const feed = ctx.body

  await feed.remove()

  ctx.status = 200
  ctx.body = {
    success: true
  }
}
