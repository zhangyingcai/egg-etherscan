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
      page: { type: 'string' },
      limit: { type: 'string' },
      sort: { type: 'string' }
    }

    const request = ctx.query;
    console.log('--holders--',request);
    
    const result = await ctx.service.tokenapi.holders(request);
    ctx.body = result;
  }
}

module.exports = tokentxController;