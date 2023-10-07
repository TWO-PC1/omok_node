
const express= require('express');
const router = express.Router();
const authUtil = require('../middlewares/auth').checkToken;
const util = require('../modules/util');
const CODE= require('../modules/statusCode')





router.post('/', authUtil, (req, res) => {


    
    

    res.status(CODE.OK).json(util.success(CODE.UNAUTHORIZED,'축'));
});

module.exports = router;
