const jwt = require('../modules/jwt');
const MSG = require('../modules/responseMessage');
const CODE = require('../modules/statusCode');
const util = require('../modules/util');
const ipban = require('../modules/ipban')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    
    checkToken: async (req, res, next) => {
        
        var token = req.headers.token;
         console.log('checkToken',token)
         const ip =req.headers['x-forwarded-for'] || req.socket.remoteAddress;
         if(!ipban.ipbancheck(ip)){
            return res.status(403).send('Access Denied: Your IP is banned.');
         }
        // 토큰 없음
        if (!token)
            return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
        // decode
        const user = await jwt.verify(token);
        // 유효기간 만료
        if (user === TOKEN_EXPIRED)
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        
        // 유효하지 않는 토큰
        if (user === TOKEN_INVALID)
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
            
        if (user === undefined)
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
           
        req.idx = user.idx;
        
        next();
    },
    wscheckToken: async (token) => {
        
    
        console.log('checkToken',token)
       // 토큰 없음
       if (!token)
           return undefined
       // decode
       const user = await jwt.verify(token);
       // 유효기간 만료
       if (user === TOKEN_EXPIRED)
           return undefined
       
       // 유효하지 않는 토큰
       if (user === TOKEN_INVALID)
           return undefined
           
       if (user === undefined)
           return undefined

   
       
       return user
   }
    
}

module.exports = authUtil;