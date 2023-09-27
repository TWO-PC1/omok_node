const express= require('express');
const router = express.Router();
const signin = require('../middlewares/signin').signinn;





router.get('/',signin , (req, res)  => {

    res.send('Hello, Express');

});
module.exports = router;
