exports.keys = 'damaobcatetherscan';

// etherscan apikey
exports.apikey = 'K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV';
// bcat contractaddress
exports.contractaddress = '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f'; // 合约地址
// bcat 交易列表
exports.txlisturl = 'https://api.etherscan.io/api?module=account&action=tokentx';
// balance by address
exports.balanceurl = 'https://api.etherscan.io/api?module=account&action=tokenbalance';
// supply by contractaddress
exports.supplyurl = 'https://api.etherscan.io/api?module=stats&action=tokensupply';
// bcat 官方地址
exports.appeth = '0x06bb48363eff79604febc5329dd3688690e7fd8f'; 
// bcat 单位
exports.tokenDecimal = 18;


// 单个数据库配置
exports.mysql = {
  // client: {
  //   host: '47.56.70.166',
  //   port: '3306',
  //   user: 'ces',
  //   password: 'nKPQt5Tm',
  //   database: 'ces'
  // },
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test'
  },
  app: true,
  agent: false
}

// cors  配置  解决跨域
exports.security = {
  domainWhiteList: [ 'http://localhost' ],
}
exports.cors = {
  origin: '*'
}

// jsonwebtoken
exports.jwt = {
  secret: 'egg-api-jwt',
  expiresIn: 60 * 60 // token 生效时间
}

// 加盐
exports.pwd_salt = 'egg-api-salt';


// close 
exports.security = {
  csrf: {
    enable: false,
  },
};

exports.scheduleTime = {
  holder: '1m', // 时间 / 5条  更新排名
  appsupply: '24h', // 获取 BCAT 官方地址量
  supply: '24h', // 获取 BCAT 供给量,
  token: '1h', // 更新最新的交易数据
  holderTime: 2 // 当前更新周期 单位：小时 必须是数字，因http://api.etherscan.io接口限制 5次/s，当前查询周期/更新排名时间 * 5 应该大于 当前地址排行数量
}

// bcat.one 文章
exports.bcatone = {
  url: 'https://www.bcat.one/wp-json/wp/v2/posts?categories=4',
  bcatone: '1m'
}