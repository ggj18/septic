function update() {
    var virus = state.virus;

    virus.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        virus.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        virus.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        virus.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        virus.body.moveDown(200);
    }
}
