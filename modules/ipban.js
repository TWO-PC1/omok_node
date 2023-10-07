const banlist = [];
const bansystem = {
    ipbanadd: (ip, time) => {
        banlist.push({ ip, time });

        console.log(`IP ${ip} has been added to the ban list for ${time}.`);

        // 시간이 지난 후에 IP 주소를 자동으로 삭제하는 타이머 설정
        setTimeout(() => {
            const index = banlist.findIndex(item => item.ip === ip);
            if (index !== -1) {
                banlist.splice(index, 1);
                console.log(`IP ${ip} has been removed from the ban list.`);
            }
        }, parseTimeToMilliseconds(time));
    },
    ipbanremove: (ip) => {
        const index = banlist.findIndex(item => item.ip === ip);
        if (index !== -1) {
            banlist.splice(index, 1);
            console.log(`IP ${ip} has been manually removed from the ban list.`);
        } else {
            console.log(`IP ${ip} is not in the ban list.`);
        }
    },
    ipbancheck:(ip)=>{
           return !banlist.some(item => item.ip === ip);
    }
};

// 사용 예시:
bansystem.ipbanadd("192.168.1.1", "30 minutes"); // 예시로 IP 주소를 추가하고 메시지를 출력
bansystem.ipbanremove("192.168.1.1"); // 예시로 IP 주소를 수동으로 제거하고 메시지를 출력
// 시간 문자열을 밀리초로 변환하는 함수
function parseTimeToMilliseconds(time) {
    const regex = /(\d+)\s*(\w+)/;
    const matches = regex.exec(time);
    if (!matches) {
        return 0;
    }
    const value = parseInt(matches[1]);
    const unit = matches[2].toLowerCase();
    switch (unit) {
        case "ms":
            return value;
        case "second":
        case "seconds":
            return value * 1000;
        case "minute":
        case "minutes":
            return value * 60 * 1000;
        case "hour":
        case "hours":
            return value * 60 * 60 * 1000;
        case "day":
        case "days":
            return value * 24 * 60 * 60 * 1000;
        default:
            return 0;
    }
}

module.exports = bansystem