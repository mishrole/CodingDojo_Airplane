const mapSize = 10;
const boxSize = 70;
const moveSize = Math.floor(boxSize / 2);

const playersDOM = document.querySelector('#players');
const enemiesDOM = document.querySelector('#enemies');
const worldDOM = document.querySelector('#world');

// Create Player
let player = document.createElement('div');
player.className = 'player';
playersDOM.appendChild(player);

let playerHasMove = true;

// MapCenter
let centerBlock = Math.floor(mapSize * boxSize / 2);

let playerPosition = {
    left: centerBlock,
    top: (mapSize * boxSize) - 100
}

let enemiesPosition = [
    {
        left: 350,
        top: 200
    },
    {
        left: 450,
        top: 250
    }
]

function setWorldDimension() {
    worldDOM.style.width = `${mapSize * boxSize}px`;
    worldDOM.style.height = `${mapSize * boxSize}px`;
}

function drawPlayer() {
    player.style.left = `${playerPosition.left}px`;
    player.style.top = `${playerPosition.top}px`;
}

function drawEnemies() {
    for(let i = 0; i < enemiesPosition.length; i++) {
        let enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = `${enemiesPosition[i].left}px`;
        enemy.style.top = `${enemiesPosition[i].top}px`;
        enemiesDOM.appendChild(enemy);
    }
}

function isMoveValid(nextMove) {
    if(playerHasMove) {
        if(nextMove > moveSize && nextMove < (mapSize * boxSize) - boxSize) {
            return true;
        }
        return false;
    }
}

function movePlayer(e) {

    // Left
    if(e.keyCode == 37) {
        let nextMove = playerPosition.left - moveSize;
        
        if(isMoveValid(nextMove)) {
            playerPosition.left = nextMove;
        }
    }
    // Top
    else if(e.keyCode == 38) {
        let nextMove = playerPosition.top - moveSize;
        
        if(isMoveValid(nextMove)) {
            playerPosition.top = nextMove;
        }
    }
    // Right
    else if (e.keyCode == 39) {
        let nextMove = playerPosition.left + moveSize;

        if(isMoveValid(nextMove)) {
            playerPosition.left = nextMove;
        }		
    }
    // Down
    else if (e.keyCode == 40) {
        let nextMove = playerPosition.top + moveSize;

        if(isMoveValid(nextMove)) {
            playerPosition.top = nextMove;
        }
    }

    drawPlayer();
}

setWorldDimension();
drawPlayer();
drawEnemies();

document.onkeydown = function (e) {
    movePlayer(e);
}