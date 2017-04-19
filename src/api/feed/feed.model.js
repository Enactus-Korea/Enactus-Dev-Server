import mongoose from 'mongoose'
// import autoIncrement from'mongoose-auto-increment'


const Comment = new mongoose.Schema({
  name: String,
  univ: String,
  userImg: String,
  comment: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
})

const Feed = new mongoose.Schema({
  typeOf: String, //전체공개 or 대나무숲
  name: String,
  univ: String,
  userImg: String,
  createdOn: { type: Date, default: Date.now },
  content: { type: String, required: true },
  postImg: String,
  // location: { type: String, default: null },
  likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  // imageSource: { type: String, default: 'null' },
  comment:[Comment],
}, {collection: 'feed'})

export default mongoose.model('feed', Feed)
