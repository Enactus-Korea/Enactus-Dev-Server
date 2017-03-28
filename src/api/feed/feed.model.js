import mongoose from 'mongoose'
// import autoIncrement from'mongoose-auto-increment'

const Feed = new mongoose.Schema({
  typeOf: String, //전체공개 or 대나무숲
  name: String,
  univ: String,
  userimg: { type: String, default: 'Avatar' },
  createdOn: { type: Date, default: Date.now },
  content: { type: String, required: true },
  userImg: [String],
  // location: { type: String, default: null },
  likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  imageSource: { type: String, default: 'null' },
  comment:[{
    c_no: Number,
    c_username: String,
    c_useruniv: String,
    c_userimg: { type: String, default: 'Avatar' },
    c_usercmt: { type: String, required: true },
    c_posted: { type: Date, default: Date.now },
  }],
}, {collection: 'feed'})

export default mongoose.model('feed', Feed)
