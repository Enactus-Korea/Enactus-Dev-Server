import mongoose from 'mongoose'
// import autoIncrement from'mongoose-auto-increment'

const Projects = new mongoose.Schema({
  name: String,
  univ: String,
  portionOf:[String], //대상자 군
  abbr_desc: String,
  detail_desc: String,
  created: String,
  status: {
    type: String,
    enum:["Ongoing","Exit"]
  }
}, {collection: 'projects'})

export default mongoose.model('projects', Projects)
