const apikey = require('../../config/config.default')
const Api = require('etherscan-api').init(apikey);

exports.list =  async() => {
  const ctx = this.ctx;

  const address = '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f';
  const startblock = 1;
  const endblock = 'latest';
  const page = 1;
  const offset = 10;
  const sort = 'desc';

  const txlist = await Api.account.txlist(address, startblock, endblock, page, offset, sort);
  console.log(txlist);
  ctx.body = {
    result:txlist
  }
  ctx.status = 200;
}

// 获取 hash 交易信息
exports.eth_getTransactionByHash = async (hash)=>{
  const ctx = this.ctx;
  const res = await Api.proxy.eth_getTransactionByHash('0x71e760fc251127172b6220361799079f9e1988f831d0c30a2fbb5ce863565a86');
  console.log(res);
  ctx.status = 200;
}