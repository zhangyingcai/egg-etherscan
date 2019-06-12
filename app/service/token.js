const Service = require('egg').Service;
const {supplyurl,balanceurl,txlisturl,apikey,contractaddress} = require('../../config/config.default');

class TokenService extends Service {
  async update(){
    console.log('-----进入定时任务----');
    // 组装url get
    const startblock = await this.startblock();
    const endblock = 999999999999;
    const sort = 'asc';
    const txUrl = `${txlisturl}&apikey=${apikey}&contractaddress=${contractaddress}&sort=${sort}&startblock=${startblock}&endblock=${endblock}`;
    // 请求数据
    const txlist = await this.ctx.curl(txUrl,{dataType: 'json',timeout: 60 * 1000});
    // 处理数据
    const txlistObj = txlist.data;
    if (txlistObj.status === '1') {// success
      txlistObj.result.forEach(async element => {
        console.log('-----开始处理数据----');
        // 数据处理
        const elementData = {
          hash:element.hash,
          from:element.from,
          to:element.to,
          blockHash:element.blockHash,
          blockNumber:element.blockNumber,
          timestamp:element.timestamp,
          nonce:element.nonce,
          value:element.value,
          confirmations:element.confirmations,
          tokenDecimal:element.tokenDecimal,
          transactionIndex:element.transactionIndex,
          input:element.input,
          gas:element.gas,
          gasPrice:element.gasPrice, // Gwei
          gasUsed:element.gasUsed
        };
        // 提交数据
        await this.app.mysql.insert('ethereum', {...elementData,status:0});
        // 是否是新增地址 -> 新增持有地址
        const created = new Date().getTime();
        const from = await this.app.mysql.get('holder', {address:element.from});
        if (!from) {
          await this.app.mysql.insert('holder', {address:element.from,created:created})
        }
        const to = await this.app.mysql.get('holder', {address:element.to});
        if (!to) {
          await this.app.mysql.insert('holder', {address:element.to,created:created})
        }
        // 结束事务
        console.log('-----处理完毕----');
      });

      this.updateblock(parseInt(txlistObj.result[txlistObj.result.length-1].blockNumber)+1);
      console.log('-----updateblock----');
    }else{
    }
  }

  async startblock(){
    let startblock = 0;
    const block = await this.app.mysql.get('config',{config_name:'startblock'});
    if(block){
      startblock = block.config_value;
    }
    return startblock;
  }
  //
  async updateblock(block){
    block = block || 0;
    this.app.mysql.update('config',{config_value:block},{where: {config_name:'startblock'}});
  }

  // update all holders
  async holder(){
    // 获取数据
    const results = await this.app.mysql.select('holder');
    // 更新数据
    if(results.length){
      await Promise.all(
        results.map(async item=> {
          const latestbalance = await this.balance(item.address);
          await this.app.mysql.update('holder',{value: latestbalance}, {where:{id: item.id}});
        })
      ).then((result) => {
        console.log('---holder all---');
      }).catch((err) => {
        console.log('---holder error---');
      });
    }
  }
  //  获取单个地址的token数量
  async balance(address){
    // curl
    const txUrl = `${balanceurl}&tag=latest&apikey=${apikey}&contractaddress=${contractaddress}&address=${address}`;
    // 请求数据
    const res = await this.ctx.curl(txUrl,{dataType: 'json',timeout: 60 * 1000});
    const resdata = res.data;
    let latestbalance = 0;
    if(resdata.status === '1'){
      latestbalance = resdata.result;
    }
    return latestbalance
  }

  // 获取当前token的总量
  async supply(){
    const txUrl = `${supplyurl}&apikey=${apikey}&contractaddress=${contractaddress}`;
    // 请求数据
    const res = await this.ctx.curl(txUrl,{dataType: 'json',timeout: 600 * 1000});
    const resdata = res.data;
    let supply = 0;
    if(resdata.status === '1'){
      supply = resdata.result;
      this.app.mysql.update('config',{config_value:supply},{where: {config_name:'tokenbalance'}});
    }
  }

  
}

module.exports = TokenService;