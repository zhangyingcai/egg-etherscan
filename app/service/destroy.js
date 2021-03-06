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

    const total = await this.count()

    res.code = 1;
    res.message = 'success';
    res.result = results;
    res.total = total;
    return res;
  }

  // create
  async create(requestMsg){
    const ctx = this.ctx;
    const res = {};
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
  // info
  async info(requestMsg){
    const ctx = this.ctx;
    const res = {};

    const result =  await this.app.mysql.get('destroy', requestMsg);

    if (result){
      res.code = 1;
      res.message = 'success';
      res.result = result;
    } else {
      res.code = 0;
      res.message = '暂无数据';
    }
    return res;
  }

  async count(){
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `destroy`' );
    const total = count.shift()['COUNT(*)'];
    return total;
  }
}

module.exports = destroyService;