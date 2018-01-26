function create() {

    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0.9;
    game.physics.box2d.setBoundsToWorld();

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');

    createEnemies();
    createVirus();

    cursors = game.input.keyboard.createCursorKeys();

    game.add.text(5,  5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'Rectangle shapes are set to ignore world boundaries.', { fill: '#ffffff', font: '14pt Arial' });

}
