const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const RsigninRouter = require("./routes/Rsignin");
const port = 3000;



app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/signin', RsigninRouter);
app.listen(port, () => {
    console.log(`Express 서버가 http://localhost:${port}에서 동작 중입니다.`);
  });