
function createEnemy() {

    var sprite = cells.create(game.world.randomX, game.world.randomY, 'cell');

    sprite.body.setCircle(16);
    //sprite.body.collideWorldBounds = false;

    sprite.eat = function(virus){

    };

    sprite.body.setBodyContactCallback(virus.body, onCollision, this);

    return sprite;
}

function createEnemies(virus) {
    cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 50; i++)
    {
        createEnemy();
    }
}
