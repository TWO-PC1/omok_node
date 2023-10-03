const express = require("express");
const router = express.Router();
router.post('/', (req, res) => {
    res.send('Express 서버가 동작 중입니다!');
    
  });
  
module.exports = router;
