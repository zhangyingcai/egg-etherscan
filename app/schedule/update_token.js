module.exports = app => {
  return {
    schedule:{
      interval: app.config.scheduleTime.token,
      type: 'all'
    },
    async task(ctx){
      // 更新最新的交易数据
      console.log(app.config.scheduleTime.token)
      ctx.service.token.update();
    }
  }
};