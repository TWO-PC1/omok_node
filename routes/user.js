
const express= require('express');
const router = express.Router();
const authUtil = require('../middlewares/auth').checkToken;
const util = require('../modules/util');





router.get('/', authUtil, (req, res) => {


    
    const successResponse = util.success(200, 'Success',1);

    res.status(200).json(successResponse);
});

module.exports = router;
