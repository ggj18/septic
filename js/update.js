PLAYER_ACCELERATION = 5.0;
PLAYER_MAX_SPEED = 200.0;
PLAYER_LINEAR_DAMPING = 0.5;

function update() {
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
}
