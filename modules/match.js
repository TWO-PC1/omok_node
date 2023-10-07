const users = new Map();
const WebSocket = require('ws');
const jwt = require("../modules/jwt");


const token ={token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbmlzdHJhdG9yIiwiYXV0aG9yaXR5IjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTY5NjY2OTQ3MCwiZXhwIjoxOTk2NjcxMjcwLCJpc3MiOiJ5c2oifQ.9qBGGcCe2Rw1yHxO3WWQndW6piA5RvKC45Hjl8-7Tic'}


// Mtoken().then((Wstoken)=>{

// token = Wstoken
// console.log('wwww',token)
// })



const socket = new WebSocket('ws://localhost:3000', {

    headers: token
});



const DataFrame = (ws1, msg) => {

    return {
        headers: 'send(moudule)',
        contents: {
            ws: ws1,
            msg: msg
        }
        
    }
}
// 연결이 열릴 때 실행됩니다.
socket.on('open', () => {
    console.log('WebSocket 연결이 열렸습니다.');
socket.send(JSON.stringify({token:token}))
    // 클라이언트에서 서버로 메시지를 보냅니다.

});

// 서버로부터 메시지를 수신했을 때 실행됩니다.
socket.on('message', (data) => { 
    if(data.toString('utf-8')!='ping'){
    console.log('서버로부터 메시지 수신:',data.toString('utf-8'));
}
});

// 연결이 닫힐 때 실행됩니다.
socket.on('close', (code, reason) => {
    console.log('WebSocket 연결이 닫혔습니다. 코드:', code, '이유:', reason.toString('utf-8'));
});

// 에러가 발생했을 때 실행됩니다.
socket.on('error', (error) => {
    console.error('WebSocket 에러:', error);
});



const matching = {
    match: (user) => {  //유저 객체를 받아옴 ex)id
        const userId = user?.id
        const userWs = user?.ws
        if (users.get(user) != undefined) {//유저 정보가 있을때 실행 
            try {
                let a = 0

                const DataFrame = {
                    id: userId,
                    elo: 1500,
                    ws: userWs,


                }
                users.set(userWs, DataFrame)

                if (users.size >= 2) {

                    for (const [key, value] of users) {
                        if (value.id != userId) {

                            const user1 = userId
                            const user2 = value
                            const user2Ws = value.ws


                            if (Math.abs(user1.elo - user2.elo) <= 110 + a) {
                                console.log('match')

                                socket.send(JSON.stringify(DataFrame(user2Ws, {
                                    'type': 'success',
                                    'contents': '매칭 성공',
                                    'Data': { 'who': user1 }
                                })));
                                socket.send(JSON.stringify(DataFrame(userWs, {
                                    'type': 'success',
                                    'contents': '매칭 성공',
                                    'Data': { 'who': user2.id }
                                })));
                            }

                        } else {
                            continue;
                        }
                    }

                }


            } catch (e) {

                socket.send(JSON.stringify(DataFrame(userWs, {
                    'type': 'error',
                    'contents': '데이터 형식이 일치하지 않습니다 .'
                })));

            };

        } else {

            socket.send(JSON.stringify(DataFrame(userWs, {
                'type': 'error',
                'contents': '이미 매칭중입니다'
            })));


        }



    },
    matchCancel:(ws)=>{
        
        const userId=users.get(ws).id
        users.delete(ws)
        console.log(`매칭 취소 ${userId}`)

    }


}
// async function Mtoken(){
//     try {
//         const token =await jwt.sign({id:'administrator'}, 'administrator');
      
//        return token
        
//     } catch(e){

//         console.error('에러:', e);

//     }
    
// }

  
module.exports = matching;