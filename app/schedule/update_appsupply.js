module.exports = app => {
  return {
    schedule:{
      interval: app.config.scheduleTime.appsupply,
      type: 'all'
    },
    async task(ctx){
      // 获取 BCAT 官方地址量
      console.log(app.config.scheduleTime.appsupply)
      ctx.service.token.appsupply();
    }
  }
};