
function createEnemy() {

    var sprite = balls.create(game.world.randomX, game.world.randomY, 'ball');

    sprite.body.setCircle(16);
    //sprite.body.collideWorldBounds = false;

    sprite.body.setBodyContactCallback(ship.body, onCollision, this);
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
