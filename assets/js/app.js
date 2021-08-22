const mapSize = 10;
const boxSize = 70;

const playersDOM = document.querySelector('#players');
const enemiesDOM = document.querySelector('#enemies');
const worldDOM = document.querySelector('#world');
const missilesDOM = document.querySelector('#missiles');

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
        left: 70,
        top: 0
    },
    {
        left: 140,
        top: -70
    },
    {
        left: 210,
        top: -140
    },
    {
        left: 280,
        top: -210
    }
]

let missilesPosition = [];

function setWorldDimension() {
    worldDOM.style.width = `${mapSize * boxSize}px`;
    worldDOM.style.height = `${mapSize * boxSize}px`;
}

function drawPlayer() {
    player.style.left = `${playerPosition.left}px`;
    player.style.top = `${playerPosition.top}px`;
}

function drawEnemies() {
    enemiesDOM.innerHTML = "";
    for(let i = 0; i < enemiesPosition.length; i++) {
        let enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = `${enemiesPosition[i].left}px`;
        enemy.style.top = `${enemiesPosition[i].top}px`;
        enemiesDOM.appendChild(enemy);
    }
}

function drawMissiles() {
    missilesDOM.innerHTML = "";
    for(let i = 0; i < missilesPosition.length; i++) {
        let missile = document.createElement('div');
        missile.className = 'missile';
        missile.style.left = `${missilesPosition[i].left}px`;
        missile.style.top = `${missilesPosition[i].top}px`;
        missilesDOM.appendChild(missile);
    }
}

function isMoveValid(nextMove) {
    if(playerHasMove) {
        if(nextMove >= boxSize && nextMove < (mapSize * boxSize) - boxSize) {
            return true;
        }
        return false;
    }
}

function movePlayer(e) {

    // Left
    if(e.keyCode == 37) {
        let nextMove = playerPosition.left - boxSize;
        
        if(isMoveValid(nextMove)) {
            playerPosition.left = nextMove;
        }
    }
    // Top
    else if(e.keyCode == 38) {
        let nextMove = playerPosition.top - boxSize;
        
        if(isMoveValid(nextMove)) {
            playerPosition.top = nextMove;
        }
    }
    // Right
    else if (e.keyCode == 39) {
        let nextMove = playerPosition.left + boxSize;

        if(isMoveValid(nextMove)) {
            playerPosition.left = nextMove;
        }		
    }
    // Down
    else if (e.keyCode == 40) {
        let nextMove = playerPosition.top + boxSize;

        if(isMoveValid(nextMove)) {
            playerPosition.top = nextMove;
        }
    }

    drawPlayer();
}

function moveEnemies() {
    for (let i = 0; i < enemiesPosition.length; i++) {
        enemiesPosition[i].top = enemiesPosition[i].top + 5;

        if(enemiesPosition[i].top > (mapSize * boxSize) - 100) {
            enemiesPosition.splice(enemiesPosition[i], 1);
        }
    }
}

function enemiesShot() {

}

function playerShot(e) {

    if(e.keyCode === 32) {
        missilesPosition.push({left: playerPosition.left + Math.floor(boxSize / 3), top: playerPosition.top - 10});
        drawMissiles();
    }
}

function moveMissiles() {
    for (let i = 0; i < missilesPosition.length; i++) {
        missilesPosition[i].top = missilesPosition[i].top - 20;

        if(missilesPosition[i].top < 0) {
            missilesPosition.splice(missilesPosition[i], 1);
        }
    }
}

function gameLoop() {
    moveEnemies();
    drawEnemies();
    moveMissiles();
    drawMissiles();
    setTimeout(gameLoop, 100);
}

setWorldDimension();
drawPlayer();
gameLoop();

document.onkeydown = function (e) {
    movePlayer(e);
    playerShot(e);
}