'use strict';

import config from '../../config';
import mongoose from 'mongoose';

export function list() {
  return new Promise((resolve) => {
    setTimeout(() => { //  resolve(config) resolve일종의 return
      // // 의미 있는거 아녕
      var kittySchema = mongoose.Schema({
          name: String
      });
      var Kitten = mongoose.model('cats', kittySchema);
      var res = Kitten.find({ name: 'Zildjian' });
      // var zizi = mongoose.get('Cat').find({'name':'Zildjian'});
      resolve(res);
    });
  });
}

export function list2() {
  return new Promise((resolve) => {
    setTimeout(() => { //  resolve(config) resolve일종의 return
      // 의미 있는거 아녕~
      resolve({
        a: 1,
        b: 2
      });
    });
  });
}
