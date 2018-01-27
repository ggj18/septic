function createBackground() {
    var background = game.add.sprite(0, 0, 'background');

    var workaround = game.add.sprite(0, 0, 'workaround');
    game.physics.box2d.enable([workaround]);
    workaround.body.clearFixtures();
    workaround.body.loadPolygon('physicsData', 'collisionLayer', workaround);
    workaround.body.static = true;
}
