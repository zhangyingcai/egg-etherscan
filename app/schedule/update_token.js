const Subscription = require('egg').Subscription;

class UpdateToken extends Subscription {
  // 配置信息
  static get schedule(){
    return {
      interval: '10m',
      type: 'all'
    }
  }
  
  async subscribe(){
    this.ctx.service.token.update();
  }
}

module.exports = UpdateToken;