const WebSocket = require('ws');
const auth = require('./middlewares/auth(ws)').checkToken
const matching = require('./middlewares/match').match
const clients = new Map();
const ipban = new Map();

module.exports = (server) =>{
const wss = new WebSocket.Server({server});








wss.on('connection',(ws,req)=>{
const ip =req.headers['x-forwarded-for'] || req.socket.remoteAddress;

console.log('새로운 클라이언트 접속',ip)

    // if(clients.get(ws)!=undefined){

    //     ws.send('인증해주세요!')
        

    // }

 if(ipban.has(ip)){
console.log('ip밴',ip)
    ws.send('비정상적인 접근이 감지되었습니다!')
                    
                    ws.close()

 }


  ws.on('message',(msg)=>{





        if (clients.has(ws)) {
            handleMessage(msg,ws)//메세지 처리
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
        console.log('auth 실행')
        const user = await auth(token)
        if(user!=undefined){
        clients.set(ws,user)
        console.log('set 완료!')
        console.log(user)
    }else{
    
        ws.send('비정상적인 접근이 감지되었습니다!')
        ipban.set(ip,'ban')
        ws.close()
    console.log('ban',ip)
    
        
    }
    }

});




}


const handleMessage=async(msg,ws)=>{

    Data = JSON.parse(msg)
   
switch(Data.headers){

case 'matching':
    const result = await matching({ // 수정: matching 모듈을 호출하는 방식 수정
        id: Data.id,
        elo: 1500,
        ws: ws,
    });
    ws.send(JSON.stringify(result));
    break;


}
}

