
function createEnemy() {

    var sprite = balls.create(game.world.randomX, game.world.randomY, 'ball');

    sprite.body.setCircle(16);
    //sprite.body.collideWorldBounds = false;

    sprite.body.setBodyContactCallback(virus.body, onCollision, this);
    return sprite;
}

function createEnemies(virus) {
    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 50; i++)
    {
        createEnemy();
    }
}
