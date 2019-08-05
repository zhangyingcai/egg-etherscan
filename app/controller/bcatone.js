const Controller = require('egg').Controller;

class bcatoneController extends Controller {
  // list
  async list(){
    const ctx = this.ctx;
    
    const rule = {
      page: { type: 'number', required: false, min: 1 },
      limit: { type: 'number', required: false, min: 1 }
    };

    const requestMsg = ctx.query;
    requestMsg.page = Number(requestMsg.page);
    requestMsg.limit = Number(requestMsg.limit);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.bcatone.list(requestMsg);
    ctx.body = result;
  }
}

module.exports = bcatoneController;