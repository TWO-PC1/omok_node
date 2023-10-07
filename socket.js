const WebSocket = require('ws');
const auth = require('./middlewares/auth').wscheckToken
const matching = require('./modules/match').match
const clients = new Map();
const ipban = require('./modules/ipban')

module.exports = (server) =>{
const wss = new WebSocket.Server({server});
console.log('websocket 서버가 동작 중입니다.')







wss.on('connection',(ws,req)=>{
const ip =req.headers['x-forwarded-for'] || req.socket.remoteAddress;

console.log('새로운 클라이언트 접속',ip)

    // if(clients.get(ws)!=undefined){

    //     ws.send('인증해주세요!')
        

    // }

 if(!ipban.ipbancheck(ip)){
console.log('ip밴',ip)
    ws.send('비정상적인 접근이 감지되었습니다!')
                    
                    ws.close()

 }


  ws.on('message',(msg)=>{





        if (clients.has(ws)) {
            handleMessage(msg,ws,ip)//메세지 처리
            } else {
                
                const token = JSON.parse(msg).token
                
                Auth(token,ws)
                
            }
            
      
        
    });
    ws.on('error',(error)=>{
        console.error(error);
        
    });

    ws.on('close',()=>{
        console.log('클라이언트 접속 해제',ip);
        clearInterval(ws.interval);
    });

    ws.interval = setInterval(()=>{
   
if(ws.readyState===ws.OPEN){
ws.send('ping');
}


    },3000);


    async function Auth(token,ws) {
        console.log('auth 실행');
        
        const user = await auth(token.token);
        if(user!=undefined){

        clients.set(ws,{main:user,num:generateUniqueNumber()})
        console.log('set 완료!')
        console.log(user)

    }else{
    
        ws.send('비정상적인 접근이 감지되었습니다!')
        ipban.ipbanadd(ip,'30minute')
        ws.close()
    console.log('ban',ip)
    
        
    }
    }

  
});




}


const handleMessage=async(msg,ws,ip)=>{

    Data = JSON.parse(msg)
   
switch(Data?.headers){

case 'matching':
     matching({ // 수정: matching 모듈을 호출하는 방식 수정
        id: clients.get(ws).main.id,
        elo: 1500,
        ws: clients.get(ws).num,
    });
    ws.send('매칭시작!');
    break;

    case 'send(moudule)':
        if(clients.get(ws).main.authority=='administrator'){
     if(findUserByNum(clients,Data.contents.ws)){
        const { ws, client } = findUserByNum(clients,Data.contents.ws)
        
        ws.send(JSON.stringify(Data.contents.msg))
        }else{
            console.log(`유저를 찾을 수 없습니다: ${Data.contents.ws}`);
        }
        } else {
        ipban.ipbanadd(ip,'30minute')
        }
}

}

function generateUniqueNumber() {
    let num;
    do {
      num = Math.floor(Math.random() * 1000); // 원하는 범위로 수정 가능
    } while (Array.from(clients.values()).some((client) => client.num === num)); // 중복 검사
    return num;
  }
  function findUserByNum(clients, targetNum) {
    for (const [ws, client] of clients) {
      if (client.num === targetNum) {
        return { ws, client }; // 해당 num 값을 가진 유저 반환
      }
    }
    return null; // 찾지 못한 경우 null 반환
  }