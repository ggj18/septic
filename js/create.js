/**
 * This variable contains all global state.
 */
state = {
  virus: null,
  cells: null
};

function create() {
    game.physics.box2d.restitution = 0.9;
    game.world.setBounds(0, 0, 7000, 5600);
    game.physics.box2d.setBoundsToWorld();
    game.stage.backgroundColor = '#ffffff';

    createBackground();
    state.virus = createVirus();
    state.cells = createEnemies(state.virus);

    cursors = game.input.keyboard.createCursorKeys();

    game.add.text(5,  5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    game.camera.follow(state.virus, Phaser.Camera.FOLLOW_TOPDOWN);

}
