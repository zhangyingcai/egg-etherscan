module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.tokentx.index)

  // tokentx
  router.get('/holders', controller.tokentx.holders);
  router.get('/accountinfo', controller.tokentx.accountinfo);
  router.get('/txinfo', controller.tokentx.txinfo);
  router.get('/tokensupply', controller.tokentx.tokensupply);
  router.get('/transactions', controller.tokentx.transactions);

  // api
  router.post('/user/signin', controller.user.signin);
  router.get('/user/signup', controller.user.signup);
}