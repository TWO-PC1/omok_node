const Mrooms = Map()  // room id,Data
const { v4: uuidv4 } = require('uuid');
function makeroomid() {
    let roomId = uuidv4();
    if (Mrooms.has(roomId) == false) {
      console.log('성공')
      return roomId
  
    } else {
      console.log('겹치는 roomid가 존재합니다.')
      makeroomid()
  
    }
  
  
  }


const modules = {
  matchingroom: (Data)=>{
    
    const roomid = makeroomid()
    
    Mrooms.set(roomid, {
    'roomname': Data.name,
    'maxuser': Data.maxuser,
    'visible':false,
    'system':'omok',
    'user': [{
        user1:Data.user1,
        user2:Data.user2
    }]
})
return roomid 
},


informationroom:(roomid)=> {
if(Mrooms.has(roomid)==true){



return {'system':Mrooms.get(roomid).system,'user':[{user1:Data.user1,user2:Data.user2}]}

}else{



    return false

}

}
    
}

module.exports = modules;



// case 'makeroom':
//     if (Data?.name !== null && Data?.roompd !== null && Data?.maxuser !== null && clients.get(ws).name !== null) {
//         if (clients.get(ws).nowroomid == null) {
//             roomid = makeroomid()
//             rooms.set(roomid, {
//                 'roomname': Data.name,
//                 'roompd': crypto.createHash('sha256').update(Data.roompd).digest('hex'),
//                 'maxuser': Data.maxuser,
//                 'user': [{
//                     'name': clients.get(ws).name,
//                     'ws': ws
//                 }]
//             });


//             let user = clients.get(ws);
//             user.nowroomid = roomid;
//             clients.set(ws, user);

           
//             Msend(ws,{ 'type': 'roomid', 'data': roomid });
//             console.log(rooms)
//             break;
//         } else {
//             Msend(ws,{ 'type': 'error', 'data': '401' });
//             console.log('지금 가능하지 않은 행동입니다!')

//             break;
//         }
//     } else {
//         Msend(ws,{ 'type': 'error', 'data': '500' });
//         console.log('데이터 형식이 잘못되었음')
//         break;
//     }

//   case 'leftroom':
//       leftroom(ws)
//       break;


//   case 'searchroom':
//       let count
//       if (Data.count && typeof Data.count === "number" && Data.count !== undefined) {
//           count = Data.data.count
//       } else {
//           count = 5
//       }

//       const roomList = [];
//       rooms.forEach((value, key) => {
//           if (roomList.length >= count) return;
//           const roomData = {
//               'roomid': key,
//               'roomname': value.roomname,
//               'maxuser': value.maxuser,
//               'usercount': value.user.length
//           };
//           roomList.push(roomData);
//       });

      
//           Msend(ws,{ 'type': 'roomlist', 'data': roomList });
      
//       break;

//       // case 'joinroom':
//       //   if (Data?.key !== undefined && rooms.has(Data?.key)) {
//       //       let finduser = rooms.get(Data.key).user.find(user => user.ws === ws); //찾은 요소 반환
//       //       let nowroomuser = rooms.get(Data.key).user.length
//       //       console.log(nowroomuser)
//       //       if (clients.get(ws).nowroomid == null && clients.get(ws).name !== null && finduser == undefined && nowroomuser<rooms.get(Data.key).maxuser) {
//       //         if( rooms.get(Data.key).roompd== null ){
//       //           console.log('room!')

//       //           clients.get(ws).nowroomid = Data.key;//들어온 유저의 nowroomid에 room key추가
                
//       //           roomuser = rooms.get(Data.key).user
//       //           roomuser.push({ 'name': clients.get(ws).name, 'ws': ws })

//       //           rooms.get(Data.key).user = roomuser
//       //           console.log(`${rooms.get(Data.key).roomname}에 입장하였습니다!`)
//       //           Msend(ws,{ 'type': 'successed', 'data': 'joinroom' });
//       //       } else if(rooms.get(Data.key).roompd===await sha256(Data.roomdpd)){
              
//       //         console.log(`${rooms.get(Data.key).roomname}에 입장하였습니다!`)

//       //         clients.get(ws).nowroomid = Data.key;//들어온 유저의 nowroomid에 room key추가
              
//       //         roomuser = rooms.get(Data.key).user
//       //         roomuser.push({ 'name': clients.get(ws).name, 'ws': ws })

//       //         rooms.get(Data.key).user = roomuser

//       //       } else {
//       //         Msend(ws,{ 'type': 'error', 'data': '500' })
//       //         console.log('비밀번호가 틀렸습니다!')
//       //         break;

//       //       }
//       //           break;

//       //       } else {
//       //           Msend(ws,{ 'type': 'error', 'data': '401' })
//       //           console.log('지금 가능하지 않은 행동입니다!')
//       //           console.log(Data.key)
//       //           console.log(rooms.has(Data.key))
//       //           break;
//       //       }


//       //   } else {
//       //       Msend(ws,{ 'type': 'error', 'data': '500' })
//       //       console.log('데이터 형식이 잘못되었음')
//       //       break;
//       //   }

// case 'joinroom':
//   const wsClient = clients.get(ws);
//   const roomKey = Data?.key;
//   const room = rooms.get(roomKey);
//   const roomUser = room?.user;
//   const roomMaxUser = room?.maxuser;
//   const roomPd = room?.roompd;
//   const userPd = Data?.roompd;
//   console.log(userPd)

//   if (room && wsClient.nowroomid === null && wsClient.name !== null && roomUser.every(user => user.ws !== ws) && roomUser.length < roomMaxUser) {
//     if (roomPd === null ||(userPd!==undefined &&roomPd === crypto.createHash('sha256').update(userPd).digest('hex'))) {
//       console.log(`${room.roomname}에 입장하였습니다!`);
//       wsClient.nowroomid = roomKey;
//       roomUser.push({ name: wsClient.name, ws });
//       Msend(ws, { type: 'successed', data: 'joinroom' });
//     } else {
//       Msend(ws, { type: 'error', data: '500' });
//       console.log('비밀번호가 틀렸습니다!');
//     }
//   } else {
//     Msend(ws, { type: 'error', data: '401' });
//     console.log('지금 가능하지 않은 행동입니다!');
//   }
//   break;

//   case 'ping':
//       Msend(ws,{ 'type': 'ping'});
//       console.log('ping')
//       break;

//   default:
//       console.log('as');
//       break;
// }

// // 해당 세션 ID를 가진 클라이언트에게 메시지 전달
// // clients.get(ws).ws.send(message);//바꾸셈
// } else {
// Msend(ws,{ 'type': 'error', 'data': '400' });
// console.log('올바르지 않은 접근')
// console.log(JSON.parse(message))
// console.log(userData)


// }



// };
