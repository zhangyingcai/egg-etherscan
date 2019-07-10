const Controller = require('egg').Controller;


// 定义创建接口的请求参数规则
const createRule = {
  accesstioken: 'string'
}

class tokentxController extends Controller {
  async index(){
    this.ctx.body = 'hello egg';
  }
  // success
  success(result,total) {
    this.ctx.body = {
      status: '1',
      result,
      total
    };
  }
  // 排行榜
  async holders(){
    const ctx = this.ctx;
    
    const request = ctx.query;
    
    const result = await ctx.service.tokenapi.holders(request);
    ctx.body = result;
  }
  // address info
  async accountinfo(){
    const ctx = this.ctx;
    
    const request = ctx.query;

    const rule = {address: {type:'string'}};
    
    ctx.validate(rule, request);
    const result = await ctx.service.tokenapi.token(request);
    ctx.body = result;
  }
  // hash info
  async txinfo(){
    const ctx = this.ctx;
    
    const request = ctx.query;

    const rule = {hash: {type:'string'}};
    
    ctx.validate(rule, request);
    const result = await ctx.service.tokenapi.txinfo(request);
    ctx.body = result;
  }
  // token balance
  async tokensupply(){
    const ctx = this.ctx;
    const result = await ctx.service.tokenapi.tokensupply();
    this.success(result);
  }
  // transactions
  async transactions(){
    const ctx = this.ctx;
    const request = ctx.query;
    const result = await ctx.service.tokenapi.transactions(request);
    const total = await ctx.service.tokenapi.transactionTotal();
    this.success(result,total);
  }
  async currency(){
    const ctx = this.ctx;
    const result = await ctx.service.token.currency();
    this.success(result);
  }
}

module.exports = tokentxController;