
function createEnemy() {

    var sprite = balls.create(game.world.randomX, game.world.randomY, 'ball');

    sprite.body.setCircle(16);
    //sprite.body.collideWorldBounds = false;

    sprite.body.setBodyContactCallback(ship.body, enemyCollide, this);
    return sprite;
}

function createEnemies(ship) { 
    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 50; i++)
    {
        createEnemy();
    }
}

function enemyCollide(body1, body2, fixture1, fixture2, begin) {
    // If 'begin' is true this is a begin contact, otherwise a contact has just ended    ... do something
    if (begin) {
        //console.log(Object.getOwnPropertyNames(body1));
        //console.log(body1.sprite);
    }
    
}
