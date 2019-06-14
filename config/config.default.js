exports.keys = 'damaobcatetherscan';
exports.apikey = 'K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV';
exports.contractaddress = '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f'; // 合约地址
exports.txlisturl = 'http://api.etherscan.io/api?module=account&action=tokentx'; // token交易列表
exports.balanceurl = 'https://api.etherscan.io/api?module=account&action=tokenbalance';
exports.supplyurl = 'https://api.etherscan.io/api?module=stats&action=tokensupply';
exports.tokenDecimal = 18;
exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'etherscan'
  },
  app: true,
  agent: false
}
exports.security = {
  domainWhiteList: [ 'http://localhost' ],
}
exports.cors = {
  origin: '*'
}