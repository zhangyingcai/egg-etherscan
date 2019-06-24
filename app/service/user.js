const Service = require('egg').Service;
// md5
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

class userService extends Service {
  // signin
  async signin(requestMsg){
    const ctx = this.ctx;
    const res = {};

    const result = await this.app.mysql.get('user', { userName:requestMsg.userName });
    console.log(result, 'result');
    if (!result) {
      res.code = 0;
      res.message = '用户不存在'
    } else {
      // pass
      const md5 = crypto.createHash('md5');

      const oldPass = md5.update(requestMsg.userPass).digest('hex');
      if (oldPass === result.userPass) {
        const token = JWT.sign(
          {userName: result.userPass},
          this.config.jwt.secret,
          { expiresIn: this.config.jwt.expiresIn }
          )
        res.code = 1;
        res.message = '登录成功';
        res.result = {id:result.id,userName:result.userName,token:token};
      } else {
        res.code = 40001;
        res.message = '密码错误';
      }
    }
    return res;
  }

  // signup
  async signup(requestMsg){
    const ctx = this.ctx;
    const res = {};

    const result = await this.app.mysql.get('user', { userName:requestMsg.userName });
    console.log(result, 'result');
    if (result) {
      res.code = 0;
      res.message = '用户已存在'
    } else {
      // pass
      const md5 = crypto.createHash('md5');

      requestMsg.userPass = md5.update(requestMsg.userPass).digest('hex');
      const user = await this.app.mysql.insert('user', requestMsg);
      res.code = 1;
      res.message = '注册成功';
      res.result = user;
    }
    return res;
  }

  // signout
  async signout(requestMsg){
    const ctx = this.ctx;
    const res = {};

    res.code = 1;
    res.message = '登出成功';
    return res;
  }
}

module.exports = userService;