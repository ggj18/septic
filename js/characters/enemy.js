
CELL_AGRO_DISTANCE = 300.0;
CELL_SPEED = 100.0;
CELL_ACCELERATION = 5.0;
CELL_LINEAR_DAMPING = 0.5;

function normalize(point, scale) {
    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if (norm != 0) { // as3 return 0,0 for a point of zero length
        point.x = 1.0 * point.x / norm;
        point.y = 1.0 * point.y / norm;
    }
    return point;
}

function createEnemy(i, posX, posY) {
    var sprite = cells.create(posX, posY, 'redCell');

    // TODO: Hook up to size
    var size_scaler = 0.5;

    // Physics properties
    sprite.body.setCircle(235 * size_scaler); // Pixel radius of art asset * scaler
    sprite.body.linearDamping = CELL_LINEAR_DAMPING;
    //sprite.body.collideWorldBounds = false;

    sprite.width = sprite.width * size_scaler;
    sprite.height = sprite.height * size_scaler;

    // Game properties
    sprite.s_agroDistance = CELL_AGRO_DISTANCE;
    sprite.s_isChasing = false;
    if(i % 2 == 1)
    {
        sprite.s_cellType = "white";
    }
    else
    {
        sprite.s_cellType = "red"; 
    }

    // Debug properties
    sprite.s_number = i;

    sprite.updatePosition = function(){
        var distance = Math.sqrt((Math.pow(virus.x - this.x, 2) + Math.pow(virus.y - this.y, 2)))
        if(distance < this.s_agroDistance)
        {
            this.s_isChasing = true;
        }
        else
        {
            this.s_isChasing = false;
        }

        if(this.s_isChasing)
        {
            // Get normalized vector towards player
            var x = virus.x - this.x;
            var y = virus.y - this.y;
            var norm = Math.sqrt(x * x + y * y);
            if (norm != 0) { // as3 return 0,0 for a point of zero length
                x = x / norm;
                y = y / norm;
            }

            if (sprite.s_cellType == "white")
            {
                // Set velocity to vector directly
                this.body.velocity.x = x * CELL_SPEED;
                this.body.velocity.y = y * CELL_SPEED;
            } else {

                // x
                velocity = this.body.velocity.x;
                velocity += CELL_ACCELERATION * x;
                if(x < 0)
                {
                    if (velocity > CELL_SPEED)
                    {
                        velocity = CELL_SPEED;
                    }
                }
                else
                {
                    if (velocity < (CELL_SPEED * -1.0))
                    {
                        velocity = (CELL_SPEED * -1.0);
                    }
                }
                this.body.velocity.x = velocity;
                
                // y
                velocity = this.body.velocity.y;
                velocity += CELL_ACCELERATION * y;
                if(y < 0)
                {
                    if (velocity > CELL_SPEED)
                    {
                        velocity = CELL_SPEED;
                    }
                }
                else
                {
                    if (velocity < (CELL_SPEED * -1.0))
                    {
                        velocity = (CELL_SPEED * -1.0);
                    }
                }
                this.body.velocity.y = velocity;
            }
        }
    };

    sprite.eat = function(virus){

    };

    sprite.body.setBodyContactCallback(virus.body, onCollision, this);

    return sprite;
}

function createEnemies(virus) {
    cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 2; i++)
    {
        // TODO: Don't spawn near player
        // TODO: randomX should take into account sprite size so it doesnt spawn in a wall
        createEnemy(i, game.world.randomX, game.world.randomY);
    }
}
