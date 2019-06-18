const Service = require('egg').Service;
const {  contractaddress } = require('../../config/config.default');

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
    let balance,tokenDecimal,tag = 0;
    if(balanceRes){
      balance = balanceRes.value;
      tokenDecimal = balanceRes.tokenDecimal;
      tag = balanceRes.tag;
    }
    // token list
    const results = await this.app.mysql.query('SELECT * FROM `ethereum` WHERE `from` LIKE "' + address + '" OR `to` LIKE "' + address +'" ORDER BY `id` LIMIT '+Number(limit)+' OFFSET '+Number(limit) * Number(page-1) );
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
      contract:contractaddress,
      totalsupply: totalsupply,
      result:results
    }
    return res
  }
}

module.exports = TokenApiService;