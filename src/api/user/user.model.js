'use strict';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt' //비밀번호 암호화? 하는 것인듯
import jwt from 'jsonwebtoken'


const Projects = new mongoose.Schema({
  name:String,
  startedY: String,
  startedM: String,
  exitedY: String,
  exitedM: String
})

const User = new mongoose.Schema({
  email: String,
  password: String,
  univ: String,
  userType: String, // ['인액터스 회원', '후원기업/기관 외']
  enactusType: String, //['학생','알룸나이','오비']
  userImg: String,
  // active: String,
  name: String,
  uuid: String,
  joined: Date,
  corporation: String,
  projects: [Projects],
  workType: String,
  selfIntro: String,
  createdOn: { type: Date, default: Date.now }
}, {collection: 'user'})

export default mongoose.model('user', User)



// userImg: { type: String, default: 'Avatar' },
// password: { type: String, required: true },
// password_confirmation : { type: String, required: true },
// kindOfProject: { type: String, required: true },
// userProject: { type: String, required: true },
// userCompany: String,
// push : Boolean,
