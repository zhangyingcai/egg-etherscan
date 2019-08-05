const Service = require('egg').Service;

class bcatoneService extends Service {

  // list
  async list(requestMsg){
    const ctx = this.ctx;
    const res = {};
    const limit = Number(requestMsg.limit) || 10;
    const page = Number(requestMsg.page) || 1;

    const results = await this.app.mysql.select('bcatone',{
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
    const result = await this.app.mysql.insert('bcatone', requestMsg);

    res.code = 1;
    res.message = 'success';
    res.result = result;
    return res;
  }

  // update
  async update(requestMsg){
    const ctx = this.ctx;
    const res = {};

    const result = await this.app.mysql.update('bcatone', requestMsg);

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

    const result =  await this.app.mysql.get('bcatone', requestMsg);

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
    const count = await this.app.mysql.query('SELECT COUNT(*) FROM `bcatone`' );
    const total = count.shift()['COUNT(*)'];
    return total;
  }

  // 更新策略
  async updateFromApi(){
    const { ctx, app} = this;
    const { bcatone } = app.config;

    const res = await this.ctx.curl(bcatone.url, { dataType: 'json', timeout: 60 * 1000 * 10 });

    const resdata = res.data;
    if (resdata.length) {
      await Promise.all(resdata.map(async (item) => {
        const result = await app.mysql.get('bcatone', {link: item.link})
        if (result) {
          await this.update({
            id: result.id,
            link: item.link,
            title: item.title.rendered,
            timeStamp: new Date(item.date).getTime()/1000
          })
        } else {
          await app.mysql.insert('bcatone', {
            link: item.link,
            title: item.title.rendered,
            timeStamp: new Date(item.date).getTime()/1000
          })
        }
      }))
    }
  }
}

module.exports = bcatoneService;