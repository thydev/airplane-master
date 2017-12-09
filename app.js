
var setting = {
    moveSpeed: 20,
    oceanWidth: 900,
    maxPlayerTop: 650,
    maxPlayerBottom: 700,
    missileSpeed: 20,
    enemySpeed: 1
}

let game = {
    start: false,
    score: 0,
    playerName: 'toto'
}

var player = {
    left: 450,
    top: 600,
    width: 70,
    height: 75
}

const enemy = {
    width: 70,
    height: 75
}

const missile = {
    width: 4,
    height: 10
}

var enemies = [
    { left: 100, top: 20 },
    { left: 180, top: 20 },
    { left: 280, top: 20 },
    { left: 380, top: 20 }
];

var missiles = [];
var timeOutId; //Use to stop the game loop

function drawPlayer() {
    var content = "<div class='player' style='left: " + player.left + "px; top: " + player.top + "px;'></div>";
    document.getElementById('players').innerHTML = content;
}

function drawEnemies() {
    var content = "";
    for (var i = 0; i < enemies.length; i++) {
        content += "<div class='enemy' style='left: " + enemies[i].left + "px; top: " + enemies[i].top + "px;'></div>";
    }
    document.getElementById('enemies').innerHTML = content;
}

function moveEnemies() {
    if (enemies.length > 0) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].top += setting.enemySpeed;
            if (enemies[i].top + enemy.height >= setting.maxPlayerTop) {
                gameStop();
            }
        }
    } else {
        generateEnemies();
    }
    
}

function drawMissiles() {
    var content = "";
    for (var i = 0; i < missiles.length; i++) {
        content += "<div class='missile' style='left: " + missiles[i].left + "px; top: " + missiles[i].top + "px;'></div>";
    }
    document.getElementById('missiles').innerHTML = content;
}

function moveMissiles() {
    let activeMissile = [];
    for (var i = 0; i < missiles.length; i++) {
        missiles[i].top -= setting.missileSpeed;
        if (!(missiles[i].top <= 0)) {
            //Keep only the missiles that are still below the top screen
            
            let activeEnemies = [];
            let isHit = false;
            for (let j = 0; j < enemies.length; j++){
                if (!isMissileHit(enemies[j].top, enemies[j].left,enemy.width, enemy.height,
                    missiles[i].top, missiles[i].left, missile.width)) {
                     activeEnemies.push(enemies[j]);   

                    } else {
                        //Yeah an enemy has been destroyed
                        game.score++;
                        isHit = true;
                        //break;
                    }
            }
            if (!isHit) {
                activeMissile.push(missiles[i]);
            }
            enemies = activeEnemies;
            drawEnemies();
            updateGameState();

        } else {
            
            
        }
    }
    missiles = activeMissile;
}

document.onkeydown = function (e) {
    if (game.start) {
        if (e.keyCode === 37 && player.left >= setting.moveSpeed) { //left

            player.left -= setting.moveSpeed;

        } else if (e.keyCode === 39 && player.left <= setting.oceanWidth - player.width) { //right
            player.left += setting.moveSpeed;
        } else if (e.keyCode === 40 && player.top <= setting.maxPlayerBottom - player.height) { //down
            player.top += setting.moveSpeed;
        } else if (e.keyCode === 38 && player.top >= setting.maxPlayerTop) { //up
            player.top -= setting.moveSpeed;
        } else if (e.keyCode === 32) { // Spacebar = fire
            missiles.push({ left: (player.left + player.width / 2), top: (player.top - 5) });
            console.log(missiles);
            moveMissiles();
            drawMissiles();

        }
        drawPlayer();
    }
}



function gameStart() {
    //console.log('timeOutId');
    //console.log("Start", game.start);
    if (game.start) {

        drawPlayer();
        moveEnemies();
        drawEnemies();
        moveMissiles();
        drawMissiles();
        //generateEnemies();
        timeOutId = setTimeout(() => {
            gameStart()
        }, 10);
    }
}

function gameStop() {
    game.start = false;
    clearTimeout(timeOutId);
    clearTimeout(genEnemiesTime)
    console.log("stop!");
}

window.onload = function () {
    game.start = true;
    gameStart();
};

function isMissileHit(planeTop, planeLeft, planeWidth, planeHeight,
                        missileTop, missileLeft, missileWidth) {
    
        if (planeTop + planeHeight >= missileTop &&
            planeLeft <= missileLeft + missileWidth && 
            missileLeft <= planeLeft + planeWidth) {
            //console.log('Destroy');
            return true;
        }
        return false;
    
}

function updateGameState() {
    document.getElementById('score').innerHTML = game.score;
    
}

var genEnemiesTime;
function generateEnemies() {
    const newEnemies = Math.floor(Math.random() * 10) + 1; //Random number from 1 to 10
    let left = 0;
    for(let i = 0; i < newEnemies; i++){
        left += enemy.width + Math.floor(Math.random() * 10) + 10;
        if (left  <= setting.oceanWidth) {
            enemies.push({ left: left, top:20 });
        }
    }
    console.log(enemies);
    
}