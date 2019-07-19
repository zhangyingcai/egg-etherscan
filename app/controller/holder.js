const Controller = require('egg').Controller;

class holderController extends Controller {
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
    const result = await ctx.service.holder.list(requestMsg);
    ctx.body = result;
  }

  // create
  async create(){
    const ctx = this.ctx;
    
    const rule = {
      address: { type: 'string', required: true, message: '必填项' }
    };

    const requestMsg = ctx.request.body;
    
    requestMsg.timeStamp = Number(requestMsg.timeStamp);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.holder.create(requestMsg);
    ctx.body = result;
  }

  // update
  async update(){
    const ctx = this.ctx;
    
    const rule = {
      id: { type: 'number', required: true, message: '必填项' }
    };

    
    const requestMsg = ctx.request.body;
    await ctx.validate(rule, requestMsg);
    //server
    const result = await ctx.service.holder.update(requestMsg);
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
    const result = await ctx.service.holder.delete(requestMsg);
    ctx.body = result;
  }

   // search
   async search(){
    const ctx = this.ctx;
    
    const rule = {
      address: { type: 'string', required: false },
      page: { type: 'number', required: false, min: 1 },
      limit: { type: 'number', required: false, min: 1 }
    };

    const requestMsg = ctx.query;
    requestMsg.page = Number(requestMsg.page);
    requestMsg.limit = Number(requestMsg.limit);
    await ctx.validate(rule, requestMsg);

    //server
    const result = await ctx.service.holder.search(requestMsg);
    ctx.body = result;
  }
}

module.exports = holderController;