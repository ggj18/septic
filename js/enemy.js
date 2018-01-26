function createEnemies() { 
    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 50; i++)
    {
        var sprite = balls.create(game.world.randomX, game.world.randomY, i % 2 == 0 ? 'ball' : 'firstaid');

        if (i % 2 == 0)
        {
            sprite.body.setCircle(16);
        }
        else
        {
            sprite.body.collideWorldBounds = false;
        }
    }
}