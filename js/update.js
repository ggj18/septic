function heartAnimation() {
    var heartArray = [state.heart2, state.heart3, state.heart4];
    for (var i = 0; i < heartArray.length; i++) {
        heartArray[i].alpha -= 0.01;
        if(heartArray[i].alpha <= 0.0)
        {
            win();
        }
    }
}

function update() {
    var virus = state.virus;
    state.heart.body.angle += 0.15
    state.heart2.body.angle -= 0.3
    state.heart3.body.angle += 0.2
    state.heart4.body.angle -= 0.3

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
            cell.updateArt();
        }
    }

    // Update virus size (cant do it in collision loop)
    if(virus.s_doUpdateSize)
    {
        updateVirusSize(virus);
    }

    if(state.heartDying)
    {
        heartAnimation();
    }

    updateCameraZoom();

}
