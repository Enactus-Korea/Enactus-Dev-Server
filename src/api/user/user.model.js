'use strict';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt' //비밀번호 암호화? 하는 것인듯
import jwt from 'jsonwebtoken'


const User = new mongoose.Schema({
  email: String,
  password: String,
  univ: String,
  userType: {
    type: String,
    enum: ['학생','알룸나이','기업','관리자']
  },
  userImg: String,
  // active: String,
  name: String,
  uuid: String,
  joined: Date,
  corporation: String,
  projects: [String],
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
