const Subscription = require('egg').Subscription;

class UpdateBalance extends Subscription {
  // 配置信息
  static get schedule(){
    return {
      interval: '1m',
      type: 'all'
    }
  }
  
  async subscribe(){
    await this.ctx.service.token.supply(); 
    await this.ctx.service.token.appsupply();
    this.ctx.service.token.holder();
  }
}

module.exports = UpdateBalance;