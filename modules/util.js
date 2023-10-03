const util = {
    // 실패 응답 생성 함수
    fail: (statusCode, message) => {
        return {
            statusCode: statusCode, // 상태 코드 (예: 400, 401)
            success: false, // 성공 여부
            message: message // 실패 메시지
        };
    },
    success: ( statusCode,message) => {
        return {
            statusCode:statusCode,
            success: true, // 성공 여부
            message: message, // 성공 메시지
           
        };
    }

};

module.exports = util;