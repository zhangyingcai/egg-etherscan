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
    await ctx.validate(rule, requestMsg);
    requestMsg.userPass = ctx.helper.encrypt(requestMsg.userPass);

    //server
    const result = await ctx.service.user.signup(requestMsg);
    ctx.body = result;
  }

  // signout
  async signout(){
    const ctx = this.ctx;
    

    const requestMsg = ctx.query;
    // await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.user.signout(requestMsg);
    ctx.body = result;
  }

  // signout
  async update(){
    const ctx = this.ctx;
    
    const rule = {
      id: { type: 'string', required: true, message: '必填项' },
      oldPass: { type: 'string', required: true },
      newPass: { type: 'string', required: true },
    };

    const requestMsg = ctx.request.body;
    requestMsg.oldPass = ctx.helper.encrypt(requestMsg.oldPass);
    requestMsg.newPass = ctx.helper.encrypt(requestMsg.newPass);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.user.update(requestMsg);
    ctx.body = result;
  }
}

module.exports = userController;