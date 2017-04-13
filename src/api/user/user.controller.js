'use strict';

import User from './user.model';
import Projects from '../projects/projects.model'
import jwt from 'jwt-simple';
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

export async function createUser(ctx, next) {
  let fields = ctx.request.body.fields,
      files = ctx.request.body.files,
      user = new User(fields);

  const fileName = user._id.toString();
  const fileType = files.userImg.type;
  const s3Params = {
    Bucket: myBucket,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
    Body: fs.createReadStream(files.userImg.path)
  };

  let ret = await s3.upload(s3Params).promise();
  user.userImg = ret.Location;
  user.save();
  ctx.body = ret.Location;
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

export async function isPushProjects(ctx) {
  console.log(ctx.request.body);
  try{
    const _id = ctx.params._id
    const modifiled = await User.update({_id}, {$push: { projects: ctx.request.body}})
    ctx.body = { modifiled }
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

export async function isGetProjects(ctx) {
  try {
    let joined = await User.findOne({_id: ctx.params._id}).select('projects univ'),
        detail = await Projects.find({univ: joined.univ}),
        obj = {},
        filterName = joined.projects.map(p => p.name);
    detail.forEach(item => {
      if(filterName.indexOf(item.name) !== -1){
        if(!obj[item.name]){
          obj[item.name] = {};
        }
        obj[item.name]= {
          detail: item,
          actived: joined.projects.find(p => p.name === item.name)
        }
      }
    })
    ctx.body = obj
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
