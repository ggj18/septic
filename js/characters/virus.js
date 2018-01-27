
function createVirus() {

    var virus = game.add.sprite(200, 200, 'virusSmallBack');
    var spriteFront = game.add.sprite(0, 0, 'virusSmallFront');
    spriteFront.anchor.x = 0.5;
    spriteFront.anchor.y = 0.5;
    virus.addChild(spriteFront);

    // Gameplay properties
    virus.smoothed = false;
    virus.s_size = 2;
    virus.s_art_scale = 0.2;
    virus.scale.set(virus.s_art_scale);

    // Physics properties
    game.physics.box2d.enable(virus, false);
    virus.body.setCircle(235 * virus.s_art_scale); //Radius of art asset * scale factor
    virus.body.linearDamping = CELL_LINEAR_DAMPING;
    //virus.body.collideWorldBounds = false;

    return virus
}
