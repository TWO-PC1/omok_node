

const express= require('express');
const router = express.Router();
const ipban = require('../modules/ipban')
const util = require('../modules/util');
const CODE = require('../modules/statusCode');





router.get('/', (req, res) => {

  const ip =req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if(!ipban.ipbancheck(ip)){
     return res.status(403).json(util.fail(CODE.Fail, 'Access Denied: Your IP is banned.'));
  }
    res.json({ message: 'pong' });
  });
  

module.exports = router;
