module.exports = app => {
  const { router, controller } = app;
  const token = app.middleware.token('egg-api-jwt');
  router.get('/', controller.tokentx.index)

  // tokentx
  router.get('/holders', controller.tokentx.holders);
  router.get('/accountinfo', controller.tokentx.accountinfo);
  router.get('/txinfo', controller.tokentx.txinfo);
  router.get('/tokensupply', controller.tokentx.tokensupply);
  router.get('/transactions', controller.tokentx.transactions);
  router.get('/currency', controller.tokentx.currency);
  // api
  // user
  router.post('/user/signin', controller.user.signin);
  // router.get('/user/signup', controller.user.signup);
  router.post('/user/signout', token, controller.user.signout);
  router.post('/user/update', token, controller.user.update);
  // des
  router.get('/destroy/list', controller.destroy.list);
  router.post('/destroy/create', token, controller.destroy.create);
  router.post('/destroy/update', token, controller.destroy.update);
  router.post('/destroy/delete', token, controller.destroy.delete);
  router.get('/destroy/info', controller.destroy.info);

  // holder
  router.get('/holder/list', controller.holder.list);
  router.post('/holder/create', token, controller.holder.create);
  router.post('/holder/update', token, controller.holder.update);
  router.post('/holder/delete', token, controller.holder.delete);
  router.get('/holder/search', controller.holder.search);
}