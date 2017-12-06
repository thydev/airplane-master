var setting = {
    moveSpeed: 10,
    oceanWidth: 900,
    maxPlayerTop: 450,
    maxPlayerBottom: 700,
    missileSpeed: 20,
    enemySpeed: 10
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

var enemies = [
    { left: 100, top: 20 },
    { left: 180, top: 20 },
    { left: 280, top: 20 },
    { left: 380, top: 20 }
];

var missiles = [];

function drawPlayer() {
    var content = "<div class='player' style='left: " + player.left + "px; top: " + player.top + "px;'></div>";
    document.getElementById('players').innerHTML = content;
}
//drawPlayer();

function drawEnemies() {
    var content = "";
    for (var i = 0; i < enemies.length; i++) {
        content += "<div class='enemy' style='left: " + enemies[i].left + "px; top: " + enemies[i].top + "px;'></div>";
    }
    document.getElementById('enemies').innerHTML = content;
}
//drawEnemies();

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].top += setting.enemySpeed;
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
    for (var i = 0; i < missiles.length; i++) {
        missiles[i].top -= setting.missileSpeed;
    }
}

document.onkeydown = function (e) {
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

var gameLoop; //Use to stop the game loop

function gameStart() {
    //console.log('gameLoop');
    if (!game.start) {
        gameStop();
    }

    drawPlayer();

    moveEnemies();
    drawEnemies();

    moveMissiles();
    drawMissiles();
    collisionDetector();

    gameLoop = setTimeout(() => {
        gameStart()
    }, 500);
}

function gameStop() {
    clearTimeout(gameLoop);
    game.start = false;
}

window.onload = function () {
    game.start = true;
    gameStart();
};

function collisionDetector() {
    console.log('collide?');
    let plane = enemies[0];
    if (missiles.length > 0) {
        
        let missile = missiles[0];
        console.log(`plane:${plane.left}, ${plane.top}`);
        console.log(`missile:${missile.left}, ${missile.top}`);
        if (plane.top + enemy.height >= missile.top &&
            plane.left <= missile.left && missile.left <= plane.left + enemy.width) {
            console.log('Destroy');
        }
    }
}