import Feed from './feed.model'

export async function createFeed(ctx, next) {
  const feed = new Feed(ctx.request.body)
  console.log(ctx.request.body)
  console.log(typeof ctx.request.body)
  try {
    await feed.save();
  } catch (err) {
    ctx.throw(422, err.message)
  }
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
