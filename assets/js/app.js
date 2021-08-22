const mapSize = 10;
const boxSize = 70;

const playersDOM = document.querySelector('#players');
const enemiesDOM = document.querySelector('#enemies');
const worldDOM = document.querySelector('#world');
const playerMissilesDOM = document.querySelector('#playerMissiles');
const enemiesMissilesDOM = document.querySelector('#enemiesMissiles');

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
        top: 0
    },
    {
        left: 210,
        top: 0
    },
    {
        left: 280,
        top: 0
    }
]

let playerMissiles = [];
let enemiesMissiles = [];

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

function drawPlayerMissiles() {
    playerMissilesDOM.innerHTML = "";
    for(let i = 0; i < playerMissiles.length; i++) {
        let missile = document.createElement('div');
        missile.className = 'playerMissile';
        missile.style.left = `${playerMissiles[i].left}px`;
        missile.style.top = `${playerMissiles[i].top}px`;
        playerMissilesDOM.appendChild(missile);
    }
}

function drawEnemiesMissiles() {
    enemiesMissilesDOM.innerHTML = "";
    for(let i = 0; i < enemiesMissiles.length; i++) {
        let missile = document.createElement('div');
        missile.className = 'enemyMissile';
        missile.style.left = `${enemiesMissiles[i].left}px`;
        missile.style.top = `${enemiesMissiles[i].top}px`;
        enemiesMissilesDOM.appendChild(missile);
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
        enemiesPosition[i].top = enemiesPosition[i].top + 10;
        enemiesMissilesLoop(i);

        if(enemiesPosition[i].top > (mapSize * boxSize) - 100) {
            enemiesPosition.splice(enemiesPosition[i], 1);

            // Delete missiles from eliminated enemies
            enemiesMissiles.find((element, index) => {
                if(element.enemy === i) {
                    enemiesMissiles.splice(enemiesMissiles[index], 1);
                }
            });
        }
    }
}

function enemiesShot(enemy) {
    enemiesMissiles.push({enemy: enemy, left: enemiesPosition[enemy].left + Math.floor(boxSize / 3), top: enemiesPosition[enemy].top + 40});
}

function playerShot(e) {
    if(e.keyCode === 32) {
        playerMissiles.push({left: playerPosition.left + Math.floor(boxSize / 3), top: playerPosition.top - 10});
        drawPlayerMissiles();
    }
}

function movePlayerMissiles() {
    for (let i = 0; i < playerMissiles.length; i++) {
        playerMissiles[i].top = playerMissiles[i].top - 10;

        if(playerMissiles[i].top < 0) {
            playerMissiles.splice(playerMissiles[i], 1);
        }
    }
}

function moveEnemiesMissiles() {
    for (let i = 0; i < enemiesMissiles.length; i++) {
        enemiesMissiles[i].top = enemiesMissiles[i].top + 20;

        if(enemiesMissiles[i].top > (boxSize * mapSize) - 100) {
            enemiesMissiles.splice(enemiesMissiles[i], 1);
        }
    }
}

function gameLoop() {
    moveEnemies();
    drawEnemies();

    movePlayerMissiles();
    drawPlayerMissiles();

    setTimeout(gameLoop, 500);
}

function enemiesMissilesLoop(i) {
    enemiesShot(i);
    moveEnemiesMissiles();
    drawEnemiesMissiles();
}

setWorldDimension();
drawPlayer();
gameLoop();

document.onkeydown = function (e) {
    movePlayer(e);
    playerShot(e);
}