const Subscription = require('egg').Subscription;

class UpdateBalance extends Subscription {
  // 配置信息
  static get schedule(){
    return {
      interval: '5m',
      type: 'all'
    }
  }
  
  async subscribe(){
    this.ctx.service.token.holder();
    this.ctx.service.token.supply(); 
  }
}

module.exports = UpdateBalance;