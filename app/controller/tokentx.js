const Controller = require('egg').Controller;


// 定义创建接口的请求参数规则
const createRule = {
  accesstioken: 'string'
}

class tokentxController extends Controller {
  async index(){
    this.ctx.body = 'hello egg';
  }

  async holders(){
    const ctx = this.ctx;
    
    const request = ctx.query;
    
    const result = await ctx.service.tokenapi.holders(request);
    ctx.body = result;
  }
  async token(){
    const ctx = this.ctx;
    
    const request = ctx.query;

    const rule = {address: {type:'string'}};
    
    ctx.validate(rule, request);
    const result = await ctx.service.tokenapi.token(request);
    ctx.body = result;
  }
}

module.exports = tokentxController;