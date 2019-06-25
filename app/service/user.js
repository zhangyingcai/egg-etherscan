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
    if (!result) {
      res.code = 0;
      res.message = '用户不存在'
    } else {
      // pass
      const md5 = crypto.createHash('md5');

      const oldPass = md5.update(requestMsg.userPass).digest('hex');
      if (oldPass === result.userPass) {
        const token = JWT.sign(
          {userName: result.userName},
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

  // updateUser
  async update(requestMsg){
    const ctx = this.ctx;
    const res = {};
    // md5 每个竟然都要一个实例
    const md51 = crypto.createHash('md5');
    requestMsg.oldPass = await md51.update(requestMsg.oldPass).digest('hex');
    const result = await this.app.mysql.get('user', { id:requestMsg.id });
    if (result) {
      if (result.userPass === requestMsg.oldPass) {
        const md5 = crypto.createHash('md5');
        requestMsg.newPass = await md5.update(requestMsg.newPass).digest('hex');

        const results = await this.app.mysql.update('user', {id: requestMsg.id, userPass: requestMsg.newPass});
        
        res.code = 1;
        res.message = '修改成功';
      } else {
        res.code = 0;
        res.message = '旧密码错误';
      }
    } else {
      res.code = 0;
      res.message = '用户不存在'
    }

    return res;
  }
}

module.exports = userService;