function createEnemy(cells, virus, size) {
    var cell = cells.create(game.world.randomX, game.world.randomY, 'cell');

    cell.body.setCircle(16);
    //cell.body.collideWorldBounds = false;

    cell.body.setBodyContactCallback(virus.body, collideWithEnemy, this);

    return cell;
}

function createEnemies(virus) {
    var cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    var enemies = []
    for (var i = 0; i < 50; i++)
    {
        var enemy = createEnemy(cells, virus, i);
        enemies.push(enemy);
    }

    return enemies;
}
