function createEnemy(virus) {
    var sprite = cells.create(game.world.randomX, game.world.randomY, 'cell');

    sprite.body.setCircle(16);
    //sprite.body.collideWorldBounds = false;

    sprite.body.setBodyContactCallback(virus.body, collideWithEnemy, this);

    return sprite;
}

function createEnemies(virus) {
    cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    var enemies = []
    for (var i = 0; i < 50; i++)
    {
        var enemy = createEnemy(virus);
        enemies.push(enemy);
    }

    return enemies;
}
