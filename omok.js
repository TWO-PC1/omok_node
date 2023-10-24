const BOARD_SIZE = 15;
const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(''));
let turn = Math.random() < 0.5 ? 2 : 1;
const users = new Map()
const first = false
let think = 0
let match = false
console.log(board)
const game = {

    set: (xpos, ypos, ws) => {

        if (!users.has(ws)) {
            if (users.size == 0) {
                users.set(ws, '1')
                console.log('111')
            } else {
                users.set(ws, '2')
                console.log('222')
            }
        }
        if (match) {
            if (users.get(ws) == turn) {

                x = xpos
                y = ypos
                console.log(x, y)
                const dol = users.get(users)
                if (board[x][y] == "") {

                    board[x][y] = dol
                    think = [x, y]
                    turn = 3 - turn
                    return true;
                } else {

                    console.log('돌있다 아그야 ')
                    return false;
                }
            } else {
                console.log('님차례 아님')
                console.log(users.get(ws))
                console.log(turn)

            }
        } else {
            console.log('아직')
        }

    },

    load: () => {
        if (match) {
            console.log('match', match)
            return think
        } else {
            return false
        }
    },
    match: () => {
        match = true
    },
    unmatch: () => {
        match = false
    },
    turn: (ws) => {
        if (users.has(ws)) {
            return users.get(ws)
        }


    }


}

module.exports = game;