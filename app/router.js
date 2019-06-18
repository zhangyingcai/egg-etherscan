module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.tokentx.index)

  // api
  // tokentx
  router.get('/tokentx', controller.api.list);
  router.get('/txinfo', controller.api.eth_getTransactionByHash);
  router.get('/holders', controller.tokentx.holders);
  router.get('/accountinfo', controller.tokentx.token);
}