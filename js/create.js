/**
 * This variable contains all global state.
 */
state = {
  virus: null,
  enemies: null
};

function create() {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0.9;
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.box2d.setBoundsToWorld();

    state.virus = createVirus();
    state.enemies = createEnemies(state.virus);

    cursors = game.input.keyboard.createCursorKeys();

    game.add.text(5,  5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    game.camera.follow(state.virus, Phaser.Camera.FOLLOW_TOPDOWN);

}
