const Controller = require('egg').Controller;

class userController extends Controller {
  // sigin
  async signin(){
    const ctx = this.ctx;
    const rule = {
      userName: { type: 'string', required: true, message: '必填项' },
      userPass: { type: 'string', required: true, message: '必填项' },
    };

    const requestMsg = ctx.request.body;
    await ctx.validate(rule, requestMsg);
    requestMsg.userPass = ctx.helper.encrypt(requestMsg.userPass);

    //server
    const result = await ctx.service.user.signin(requestMsg);
    ctx.body = result;
  }
  // signup
  async signup(){
    const ctx = this.ctx;
    const rule = {
      userName: { type: 'string', required: true, message: '必填项' },
      userPass: { type: 'string', required: true, message: '必填项' },
    };

    const requestMsg = ctx.query;
    console.log(requestMsg, 'requestMsg')
    await ctx.validate(rule, requestMsg);
    requestMsg.userPass = ctx.helper.encrypt(requestMsg.userPass);

    //server
    const result = await ctx.service.user.signup(requestMsg);
    ctx.body = result;
  }
}

module.exports = userController;