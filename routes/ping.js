

const express= require('express');
const router = express.Router();
const authUtil = require('../middlewares/auth').checkToken;









router.get('/ping',authUtil, (req, res) => {
    res.json({ message: 'pong' });
  });
  