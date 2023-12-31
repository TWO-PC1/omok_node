const jwt = require('../modules/jwt');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const ipban = require('../modules/ipban')
const Sign = {
  signinn: async (req, res, next) => {
    console.log()
    const user = req.body?.id; // 사용자 정보
    const userpd = req.body?.pd;
    const userauthority = 'user';
   const DataFrame = {
    id:user
   }
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!ipban.ipbancheck(ip)) {
      return res.status(403).json(util.fail(CODE.Fail, 'Access Denied: Your IP is banned.'));
    }
    if (user == 'example' && userpd == 'example1') {
      console.log('success')
    } else {
      console.log('error');
      console.log(req.body)

      return res.status(CODE.UNAUTHORIZED).json(util.fail(CODE.Fail, MSG.Fail));
    }

    try {
      // user의 idx, email을 통해 토큰을 생성
      const jwtToken = await jwt.sign(DataFrame,userauthority);

      // 토큰을 클라이언트에게 응답으로 전송
      return res.status(CODE.OK).json(util.success(MSG.LOGIN_SUCCESS,

        jwtToken.token
      ));

    } catch (error) {
      // 오류 처리
      console.error(error);
      return res.status(CODE.INTERNAL_SERVER_ERROR).json(util.fail(CODE.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR));
    }
  }
};

module.exports = Sign;