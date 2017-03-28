import mongoose from 'mongoose'
// import autoIncrement from'mongoose-auto-increment'

const Permission = new mongoose.Schema({
  name: String,
  univ: String,
  email:String //대상자 군
}, {collection: 'permission'})

export default mongoose.model('permission', Permission)
