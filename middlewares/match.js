const users= new Map()



const matching={
match:async(user)=>{  //유저 객체를 받아옴 ex)id
    if(user.get(user)!=undefined) {//유저 정보가 있을때 실행 
try{
let a=0
const self=user.id
        const DataFrame={
            id:self,
            elo:1500,
            ws:user.ws,


        }
    users.set(user,DataFrame)
    
if(users.size>=2){

for (const [key, value] of myMap) {
    if(value.id!=self){

    const user1=self
    const user2=value


    if(Math.abs(user1.elo-user2.elo)<=110+a){
    console.log('match')


    return{'type':'success',
    'contents':'매칭 성공',
    'Data':{'who':user2.id}
     
};
    }

    }else{
    continue;
    }
} 



}



    } catch(e){

        console.error(e)
        return{'type':'error',
        'contents':'데이터 형식이 일치하지 않습니다 .'
};

    }
} else {


return {'type':'error',
    'contents':'이미매칭중입니다.'
};





}








}


}


module.exports = matching;