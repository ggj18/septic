function create() {
    
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0.9;
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.box2d.setBoundsToWorld();

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');

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

    ship = game.add.sprite(200, 200, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');

    // Create our physics body - a 28px radius circle.
    game.physics.box2d.enable(ship, false);
    ship.body.fixedRotation = true;
    ship.body.setCircle(28);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.add.text(5,  5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'Rectangle shapes are set to ignore world boundaries.', { fill: '#ffffff', font: '14pt Arial' });

    game.camera.follow(ship, Phaser.Camera.FOLLOW_TOPDOWN);
    
}

