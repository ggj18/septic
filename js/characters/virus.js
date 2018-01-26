function createVirus() {
    virus = game.add.sprite(200, 200, 'virus');
    virus.scale.set(2);
    virus.smoothed = false;
    virus.animations.add('fly', [0,1,2,3,4,5], 10, true);
    virus.play('fly');

    // Create our physics body - a 28px radius circle.
    game.physics.box2d.enable(virus, false);
    virus.body.fixedRotation = true;
    virus.body.setCircle(28);

    virus.eat = function(cell){

    };
}
