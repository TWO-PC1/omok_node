const jwt = require('../modules/jwt');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const Sign = {
    signinn: async (req, res) => {
      const user = req.id; // 사용자 정보
  
      try {
        // user의 idx, email을 통해 토큰을 생성
        const jwtToken = await jwt.sign(user);
        
        // 토큰을 클라이언트에게 응답으로 전송
        return res.status(CODE.OK).json(util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
            
          token: jwtToken.token
        }));
        
      } catch (error) {
        // 오류 처리
        console.error(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).json(util.fail(CODE.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR));
      }
    }
  };
  
module.exports = Sign;