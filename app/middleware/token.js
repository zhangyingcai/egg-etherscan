'use strict';

// token 验证中间件
// need npm install jsonwebtoken
// http header set X-Token

const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.headers['x-token'];
    const method = ctx.method.toLowerCase();
    const res = {};
    if (method === 'get'){
      await next();
    } else if (!token) {
      ctx.status = 401;
      res.code = 50008;
      ctx.body = res;
    } else {
      let decode ;
      try {
        decode = JWT.verify(token, options)
        console.log(decode)
        if (!decode){
          ctx.status = 401;
          res.code = 50008;
          ctx.body = res;
        }
        if (Date.now() / 1000 - decode.exp > 0){
          ctx.status = 401;
          res.code = 50014;
          ctx.body = res;
        }
      } catch (e) {
        if (e.message === 'jwt expired'){
          ctx.status = 200;
          res.code = 50014;
          ctx.body = res;
        }
        console.log(e)
      }

      // 可以在做一下查找校验
      await next();
    }
  }
}