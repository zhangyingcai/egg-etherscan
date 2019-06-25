exports.keys = 'damaobcatetherscan';

// etherscan apikey
exports.apikey = 'K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV';
// bcat contractaddress
exports.contractaddress = '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f'; // 合约地址
// bcat 交易列表
exports.txlisturl = 'http://api.etherscan.io/api?module=account&action=tokentx';
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
