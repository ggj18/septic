
CELL_AGRO_DISTANCE = 300.0;
CELL_SPEED = 100.0;
CELL_ACCELERATION = 5.0;
CELL_LINEAR_DAMPING = 0.5;
CELL_DISABLE_MOVEMENT = true;

function normalize(point, scale) {
    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if (norm != 0) { // as3 return 0,0 for a point of zero length
        point.x = 1.0 * point.x / norm;
        point.y = 1.0 * point.y / norm;
    }
    return point;
}

function getCellArt(size, cellType, front=true){
    if(cellType == "white")
    {
        if(size <= 3)
        {
            if(front) return "WBCsmallFront";
            else return "WBCsmallBack";
        }
        else if(size <= 6)
        {
            if(front) return "WBCmedFront";
            else return "WBCmedBack";
        }
        else
        {
            if(front) return "WBClargeFront";
            else return "WBClargeBack";
        }
    }
    else
    {
        return "redCell";
    }
}

function getCellArtScale(size){
    // The size determines the scaler for art/physics
    // Map size 1-10 to 0.1-1.0
    return size / 10.0;
}

function createEnemy(i, posX, posY, cells, cellType, cellSize) {
    var virus = state.virus;

    var sprite;
    if(cellType == "white")
    {
        sprite = cells.create(posX, posY, getCellArt(cellSize, cellType, front=false));
        var spriteFront = game.add.sprite(0, 0, getCellArt(cellSize, cellType, front=true));
        spriteFront.anchor.x = 0.5;
        spriteFront.anchor.y = 0.5;
        sprite.addChild(spriteFront);
    }
    else
    {
        sprite = cells.create(posX, posY, getCellArt(cellSize, cellType, front=false));
    }
    sprite.s_cellType =cellType;
    sprite.s_size = cellSize;
    sprite.s_art_scale = getCellArtScale(sprite.s_size);

    // Physics properties
    sprite.body.setCircle(235 * sprite.s_art_scale); // Pixel radius of art asset * scaler
    sprite.body.linearDamping = CELL_LINEAR_DAMPING;
    sprite.body.fixedRotation = true;
    //sprite.body.collideWorldBounds = false;

    // Game properties
    sprite.s_agroDistance = CELL_AGRO_DISTANCE;
    sprite.s_isChasing = false;
    sprite.scale.set(sprite.s_art_scale);

    // Debug properties
    sprite.s_number = i;

    sprite.updatePosition = function(){

        if(CELL_DISABLE_MOVEMENT)
            return;

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
        else
        {
            //TODO: Random movements
        }
    };

    sprite.updateRotation = function(){
        // Rotate front sprite
        var arrayLength = this.children.length;
        for (var i = 0; i < arrayLength; i++) {
            this.children[i].angle += 0.1;
            this.children[i].angle += 0.1;
        }
        // Rotate back sprite
        this.body.angularVelocity = -0.1;
    }

    sprite.eat = function(virus){

    };

    sprite.body.setBodyContactCallback(state.virus.body, collideWithEnemy, this);

    return sprite;
}

function createEnemies(virus) {
    var cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    // DEBUG
    var x = 300; // = game.world.randomX
    var y = 300; // = game.world.randomY
    for (var i = 0; i < 10; i++)
    {
        var size =  Math.floor((Math.random() * 5) + 1)
        var cellType = "white";
        if(i % 2 == 1)
        {
            cellType = "red";
        }
        // TODO: Don't spawn near player
        // TODO: randomX should take into account sprite size so it doesnt spawn in a wall
        enemy = createEnemy(i, x, y, cells, cellType, size);
        x+= 200;
        y+= 200;
    }

    return cells;
}
