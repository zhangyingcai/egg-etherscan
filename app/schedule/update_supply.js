module.exports = app => {
  return {
    schedule:{
      interval: app.config.scheduleTime.supply,
      type: 'all'
    },
    async task(ctx){
      // 获取 BCAT 供给量
      console.log(app.config.scheduleTime.supply)
      ctx.service.token.supply();
    }
  }
};