const Controller = require('egg').Controller;

class destroyController extends Controller {
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
    const result = await ctx.service.destroy.list(requestMsg);
    ctx.body = result;
  }

  // create
  async create(){
    const ctx = this.ctx;
    
    const rule = {
      value: { type: 'string', required: true, message: '必填项' },
      hash: { type: 'string', required: true, message: '必填项' },
      message: { type: 'string', required: false },
      timeStamp: { type: 'number', required: true, message: '必填项' },
    };

    const requestMsg = ctx.request.body;
    
    requestMsg.timeStamp = Number(requestMsg.timeStamp);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.destroy.create(requestMsg);
    ctx.body = result;
  }

  // update
  async update(){
    const ctx = this.ctx;
    
    const rule = {
      id: { type: 'number', required: true, message: '必填项' },
      value: { type: 'string', required: true, message: '必填项' },
      hash: { type: 'string', required: true, message: '必填项' },
      timeStamp: { type: 'number', required: true, message: '必填项' },
    };

    
    const requestMsg = ctx.request.body;
    await ctx.validate(rule, requestMsg);
    //server
    const result = await ctx.service.destroy.update(requestMsg);
    ctx.body = result;
  }

   // delete
  async delete(){
    const ctx = this.ctx;
    
    const rule = {
      id: { type: 'number', required: true, message: '必填项' }
    };

    const requestMsg = ctx.request.body;
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.destroy.delete(requestMsg);
    ctx.body = result;
  }
  // info
  async info(){
    const ctx = this.ctx;
    
    const rule = {
      id: { type: 'number', required: true, message: '必填项' }
    };

    const requestMsg = ctx.query;
    requestMsg.id = Number(requestMsg.id);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.destroy.info(requestMsg);
    ctx.body = result;
  }
}

module.exports = destroyController;