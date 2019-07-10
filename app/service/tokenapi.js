const Service = require('egg').Service;
const {  contractaddress } = require('../../config/config.default');
// var api = require('etherscan-api').init(apikey);


class TokenApiService extends Service{
  // holders
  async holders(params){
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const sort = params.sort ? (params.sort.toString().toLowerCase().includes('asc') ? 'asc' : 'desc') : 'desc';
    console.log('---',page,limit,sort);
    // const results = await this.app.mysql.select('holder',{
    //   columns: ['address','value'],
    //   orders:[['value', sort]],
    //   limit: Number(limit),
    //   offset: Number(limit) * Number(page-1),
    // });

    const results = await this.app.mysql.query('SELECT * FROM `holder` WHERE `value` IS NOT NULL AND `value` > 0 ORDER BY `percentage` '+sort+' LIMIT '+Number(limit)+' OFFSET '+Number(limit) * Number(page-1));
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `holder` WHERE `value` IS NOT NULL AND `value` > 0');
    const balance = await this.app.mysql.get('config',{config_name:'tokenbalance'});
    const res = {
      status: '1',
      result: results,
      total: count[0]['COUNT(*)'],
      totaltoken: balance.config_value
    };
    return res;
  }

  // token
  async token(params) {
    const ctx = this.ctx;
    // xss
    const address = ctx.helper.escape(params.address);
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    // token balance tokenDecimal
    const balanceRes = await this.app.mysql.get('holder',{address:address});
    let balance,tokenDecimal,tag = '',message='';
    if(balanceRes){
      balance = balanceRes.value;
      tokenDecimal = balanceRes.tokenDecimal;
      tag = balanceRes.tag;
      message = balanceRes.message;
    }
    // token list
    const results = await this.app.mysql.query('SELECT * FROM `ethereum` WHERE `from` LIKE "' + address + '" OR `to` LIKE "' + address +'" ORDER BY `timeStamp` desc LIMIT '+Number(limit)+' OFFSET '+Number(limit) * Number(page-1) );
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `ethereum` WHERE `from` LIKE "' + address + '" OR `to` LIKE "' + address + '"' );
    console.log(count)
    // totalsupply
    const restotal = await this.app.mysql.get('config', { config_name: 'tokenbalance' });
    let totalsupply = 0;
    if (restotal) {
      totalsupply = restotal.config_value / Math.pow(10, tokenDecimal);
    }
    // return
    const res = {
      status: '1',
      balance: balance,
      tokenDecimal: tokenDecimal,
      tag: tag,
      message: message,
      contract:contractaddress,
      totalsupply: totalsupply,
      result:results,
      total: count.shift()['COUNT(*)']
    }
    return res
  }
  // 交易哈希详情
  async txinfo(params){
    
    const results = await this.app.mysql.get('ethereum', {hash:params.hash});
    let res = {};
    if (results) {
      res.status= '1';
      res.result= results;
      res.message= 'success'
    }else{
      res.status = '0';
      res.message = '暂无数据'
    }
    return res;
  }

  // 获取 token supply
  async tokensupply(){
    const result = await this.app.mysql.get('config', { config_name: 'tokenbalance' });
    let balance = 0;
    if (result) {
      balance = result.config_value;
    }
    return balance;
  }

  // destroy
  async destroy(params){
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const results = await this.app.mysql.select('destroy',{
      orders:[['timeStamp', 'desc']],
      limit: Number(limit),
      offset: Number(limit) * Number(page-1),
    });
    return results;
  }
  // destroytotal
  async destroyTotal(){
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `destroy`');
    return count.shift()['COUNT(*)'] || 0
  }
  // transactions
  async transactions(params){
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    // const results = await this.app.mysql.select('ethereum',{
    //   orders:[['timeStamp', 'desc']],
    //   limit: Number(limit),
    //   offset: Number(limit) * Number(page-1),
    // });
    const results = await this.app.mysql.query('select ethereum.value,ethereum.hash,ethereum.tokenDecimal,ethereum.from,ethereum.to,ethereum.`timeStamp`,ethereum.id,a.tag as fromtag,b.tag as totag from `ethereum` left join `holder` as a on ethereum.from=a.address left join `holder` as b on ethereum.to = b.address ORDER BY `timeStamp` desc LIMIT '+Number(limit)+' OFFSET '+Number(limit) * Number(page-1) );
    return results;
  }
  // transactiontotal
  async transactionTotal(){
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `ethereum`');
    return count.shift()['COUNT(*)'] || 0
  }
  // 
  // async clears(){
  //   const result = await api.account.txlist(contractaddress, 1, 'latest', 1, 100, 'desc');
  //   return result;
  // }
  // async eth_getTransactionByHash(params){
  //   const result = await api.proxy.eth_getTransactionByHash(params.hash);
  //   return result;
  // }
  // async tokentx(){
  //   const result = await api.account.tokentx(contractaddress, contractaddress, 1, 'latest', 'desc');
  //   return result;
  // }
  // async eth_getTransactionByBlockNumberAndIndex(params){
  //   const result = await api.proxy.eth_getTransactionByBlockNumberAndIndex(params.blocknumber, params.index);
  //   return result;
  // }
}

module.exports = TokenApiService;