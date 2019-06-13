const Subscription = require('egg').Subscription;

class UpdateBalance extends Subscription {
  // 配置信息
  static get schedule(){
    return {
      interval: '2m',
      type: 'all'
    }
  }
  
  async subscribe(){
    await this.ctx.service.token.supply(); 
    this.ctx.service.token.holder();
  }
}

module.exports = UpdateBalance;