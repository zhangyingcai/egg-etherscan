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
    const rule = {
      page: { type: 'number' },
      limit: { type: 'number' },
      sort: { type: 'string' }
    }

    const request = ctx.request.body;
    await ctx.validate(rule, request);
    const result = await ctx.service.tokenapi.holders(request);
    ctx.body = result;
  }
}

module.exports = tokentxController;