module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.tokentx.index)

  // api
  // tokentx
  router.get('/holders', controller.tokentx.holders);
  router.get('/accountinfo', controller.tokentx.accountinfo);
  router.get('/txinfo', controller.tokentx.txinfo);
  router.get('/tokensupply', controller.tokentx.tokensupply);
  router.get('/transactions', controller.tokentx.transactions);
}