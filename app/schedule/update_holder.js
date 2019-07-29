const Subscription = require('egg').Subscription;

class UpdateBalance extends Subscription {
  // 配置信息
  static get schedule(){
    return {
      interval: '20m',
      type: 'all'
    }
  }
  
  async subscribe(){
    // 更新排名
    this.ctx.service.token.holder();
  }
}

module.exports = UpdateBalance;

module.exports = app => {
  return {
    schedule:{
      interval: app.config.scheduleTime.holder,
      type: 'all'
    },
    async task(ctx){
      // 更新排名
      console.log(app.config.scheduleTime.holder)
      ctx.service.token.holder();
    }
  }
};