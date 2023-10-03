
const express= require('express');
const router = express.Router();
const authUtil = require('../middlewares/auth').checkToken;
const util = require('../modules/util');
const CODE= require('../modules/statusCode')





router.post('/', authUtil, (req, res) => {


    
    const successResponse = util.success( 'Success',1);

    res.status(CODE.OK).json(successResponse);
});

module.exports = router;
