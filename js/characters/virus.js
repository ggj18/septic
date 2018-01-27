
function createVirus() {
    var virus = game.add.sprite(200, 200, 'virus');
    virus.scale.set(0.2);
    virus.smoothed = false;

    game.physics.box2d.enable(virus, false);
    virus.body.setCircle(28);

    virus.eat = function(cell){

    };

    return virus
}
