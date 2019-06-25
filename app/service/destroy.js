const Service = require('egg').Service;

class destroyService extends Service {

  // list
  async list(requestMsg){
    const ctx = this.ctx;
    const res = {};
    const limit = Number(requestMsg.limit) || 10;
    const page = Number(requestMsg.page) || 1;

    const results = await this.app.mysql.select('destroy',{
      orders:[['timeStamp', 'desc']],
      limit: limit,
      offset: limit * Number(page-1),
    });

    res.code = 1;
    res.message = 'success';
    res.result = results;
    return res;
  }

  // create
  async create(requestMsg){
    const ctx = this.ctx;
    const res = {};
    console.log(requestMsg)
    const result = await this.app.mysql.insert('destroy', requestMsg);

    res.code = 1;
    res.message = 'success';
    res.result = result;
    return res;
  }

  // update
  async update(requestMsg){
    const ctx = this.ctx;
    const res = {};

    const result = await this.app.mysql.update('destroy', requestMsg);

    res.code = 1;
    res.message = 'success';
    res.result = result;
    return res;
  }

  // delete
  async delete(requestMsg){
    const ctx = this.ctx;
    const res = {};

    await this.app.mysql.delete('destroy', requestMsg);

    res.code = 1;
    res.message = 'success';
    return res;
  }
}

module.exports = destroyService;