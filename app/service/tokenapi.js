const Service = require('egg').Service;

class TokenApiService extends Service{
  // holders
  async holders(params){
    const page = params.page || 1;
    const limit = params.limit || 10;
    const sort = params.sort.toString().toLowerCase().includes('asc') ? 'asc' : 'desc';
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
}

module.exports = TokenApiService;