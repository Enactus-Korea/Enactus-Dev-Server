'use strict';
//코아의 전반적인 것을 설정함
import config from './index';
import morgan from 'koa-morgan';
import parser from 'koa-body';
import compress from 'koa-compress';

export default function configKoa(app) {
  app.use(compress()); //app.use로 라이브러리 사용함
  app.use(parser({ //json보낼때 인식못하는 것들을 자동으로 json으로 파싱?해주는것
    multipart: true
  }));

  app.use((ctx, next) => { //14-17은 앱에서 서버로 api콜(get or post)을 보냈어
    //클라이언트 -> 서버 :리퀘스트  서버-> 클라이언트 : reponse
    ctx.body = ctx.request.body;
    return next();
  });

  app.on('error', err => console.error(err)); //에러 발생하면 콘솔로 찍어주ㅝ
// function (err){
//   console.error(err)
// }
  app.use(morgan(config.dev.logType)); //로그남기는 라이브러리리리
}
