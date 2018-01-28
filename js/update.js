function update() {
    var virus = state.virus;

    PLAYER_ACCELERATION = 10.0;
    PLAYER_MAX_SPEED = 250.0;
    PLAYER_LINEAR_DAMPING = 0.5;

    virus.body.linearDamping = PLAYER_LINEAR_DAMPING;

    if (cursors.left.isDown)
    {
        velocity = virus.body.velocity.x;
        velocity -= PLAYER_ACCELERATION;
        if (velocity <= (PLAYER_MAX_SPEED * -1.0))
        {
            velocity = (PLAYER_MAX_SPEED * -1.0);
        }
        virus.body.velocity.x = velocity;
    }
    else if (cursors.right.isDown)
    {
        velocity = virus.body.velocity.x;
        velocity += PLAYER_ACCELERATION;
        if (velocity >= PLAYER_MAX_SPEED)
        {
            velocity = PLAYER_MAX_SPEED;
        }
        virus.body.velocity.x = velocity;
    }

    if (cursors.up.isDown)
    {
        velocity = virus.body.velocity.y;
        velocity -= PLAYER_ACCELERATION;
        if (velocity <= (PLAYER_MAX_SPEED * -1.0))
        {
            velocity = (PLAYER_MAX_SPEED * -1.0);
        }
        virus.body.velocity.y = velocity;
    }
    else if (cursors.down.isDown)
    {
        velocity = virus.body.velocity.y;
        velocity += PLAYER_ACCELERATION;
        if (velocity >= PLAYER_MAX_SPEED)
        {
            velocity = PLAYER_MAX_SPEED;
        }
        virus.body.velocity.y = velocity;
    }

    // Update all enemies
    var arrayLength = state.cells.children.length;
    for (var i = 0; i < arrayLength; i++) {
        var cell = state.cells.children[i];
        if(cell == undefined)
            continue;

        if(cell.s_isDying && ! cell.s_isDead) {
            cellDeathAnim(cell);
        }

        if(!cell.s_isDying && !cell.s_isDead) {
            cell.updatePosition();
            cell.updateRotation();
        }
    }

    // Update virus size (cant do it in collision loop)
    if(virus.s_doUpdateSize)
    {
        updateVirusSize(virus);
    }

    updateCameraZoom();
}
