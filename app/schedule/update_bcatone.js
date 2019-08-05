module.exports = app => {
  return {
    schedule:{
      interval: app.config.bcatone.bcatone,
      type: 'all'
    },
    async task(ctx){
      // 更新最新的交易数据
      console.log(app.config.bcatone.bcatone)
      ctx.service.bcatone.updateFromApi();
    }
  }
};