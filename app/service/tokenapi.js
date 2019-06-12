const Service = require('egg').Service;

class TokenApiService extends Service{
  // holders
  async holders(params){
    const page = params.page || 1;
    const limit = params.limit || 10;
    const sort = params.sort || 'desc';
    const results = await this.app.mysql.select('holder',{
      columns: ['address','value'],
      orders:[['value', sort]],
      limit: limit,
      offset: Number(limit) * Number(page-1)
    });
    
    const res = {
      status: 1,
      data: results
    };
    return res;
  }
}

module.exports = TokenApiService;