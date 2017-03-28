'use strict';

import User from './user.model';
import jwt from 'jwt-simple';
import config from '../../config/env/common'
import fs from 'fs';


export async function createUser(ctx, next) {
  const user = new User(ctx.request.body)
  console.log(ctx.request.body)
  console.log(typeof ctx.request.body)
  // try {
    await user.save();
  // } catch (err) {
  //   ctx.throw(422, err.message)
  // }
}

export async function allUsers(ctx) {
  const users = await User.find()
  ctx.body = { users }
}

/* 특정 User 정보 조회 */
// export async function getUser(ctx) {
//   const userInfo = ctx.request.body;
//   console.log(userInfo);
//   //const feed = ctx.request.body;
//   const user = await User.findOne({uuid: userInfo.uuid});
//   ctx.body = user;
// }

export async function isFetchedLogInUser(ctx){
  const email = ctx.params.email;
  const Fetcted = await User.find({email}).select('-password')
  // console.log(Fetcted)
  ctx.body={ userData: Fetcted }
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user._id, iat: timestamp }, config.secret)
}

export async function login(ctx) {
  const {email, password} = ctx.request.body;
  console.log(ctx.request.body);
  const user = await User.findOne({ email, password });
  if(!user){
    ctx.status = 401;
    console.log('err')
    ctx.body = { success: false , loginErr: '이메일이나 비밀번호를 확인해주세요.' };
  } else {
    console.log('success')
    ctx.body = { success: true, token: tokenForUser(user) };
  }
}

export async function isModifiedIntro(ctx) {
  try{
    const email = ctx.params.email, { selfIntro } = ctx.request.body;
    console.log(email, selfIntro)
    const modifiled = await User.findOneAndUpdate({email}, {$set: {selfIntro}}, { new: true })
    ctx.body = { modifiled }
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

//TODO: 유저 image 등록하는 곳

// var imgPath = '/path/to/some/img.png';
// a.img.data = fs.readFileSync(imgPath);
//     a.img.contentType = 'image/png';

// export async function isModifiedUserImg(ctx) {
//   try{
//     const email = ctx.params.email, {}
//   }
// }



// const email = ctx.params.email;
// const Fetcted = await User.find({email}).select('-password')
// console.log(Fetcted)
// ctx.body={ userData: Fetcted }

/* 기존의 getUser
export async function getUser(ctx, next) {
  try {
    const user = await User.findById(ctx.params.id, '-password')
    if (!user) {
      ctx.throw(404)
    }

    ctx.body = {
      user
    }
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  if(next) return next()
}
*/
