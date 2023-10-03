const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;



const auth = {
    
    checkToken: async (token) => {
        
    
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

module.exports = auth;