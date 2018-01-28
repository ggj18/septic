
CELL_AGRO_DISTANCE = 300.0;
CELL_AGRO_DISTANCE_RED = 200.0;
CELL_SPEED = 100.0;
CELL_ACCELERATION = 5.0;
CELL_ACCELERATION_RED = 3.0;
CELL_LINEAR_DAMPING = 0.5;
CELL_DISABLE_MOVEMENT = false;

function randomNb(min, max) {
  return Math.floor(Math.random() * max) + min  
}

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
        if(size <= 30)
        {
            if(front) return "WBCsmallFront";
            else return "WBCsmallBack";
        }
        else if(size <= 60)
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
        if(front) return "redCellGlow";
        else return "redCell";
    }
}

function getCellArtScale(size){
    // The size determines the scaler for art/physics
    // Map size 1-100 to 0.05-0.5
    var result = 0.5;
    if(size < 10)
    {
        result = 0.05;
    } else if (size < 20) {
        result = 0.10;
    } else if (size < 30) {
        result = 0.15;
    } else if (size < 40) {
        result = 0.20;
    } else if (size < 50) {
        result = 0.25;
    } else if (size < 60) {
        result = 0.30;
    } else if (size < 70) {
        result = 0.35;
    } else if (size < 80) {
        result = 0.40;
    } else if (size < 90) {
        result = 0.45;
    } else {
        result = 0.5;
    }

    return result;
}

function killEnemy(cell)
{
    cell.s_isDying = true;

    // White cells play dying animation
    if (cell.s_cellType == "red")
    {
        // Kill glow
        var arrayLength = cell.children.length;
        for (var i = 0; i < arrayLength; i++) {
            cell.children[i].destroy();
        }

        // Red cells change art and go inert
        cell.loadTexture("redCellDead", 0);
        var spriteFront = game.add.sprite(0, 0, "redCell");
        spriteFront.anchor.x = 0.5;
        spriteFront.anchor.y = 0.5;
        spriteFront.alpha = 1.0;
        cell.addChild(spriteFront);

        cell.body.linearDamping = 3.0;
        cell.body.mass *= 2.0;
    } 
}

function cellDeathAnim(cell)
{
    if(cell.s_cellType == "white")
    {
        cell.body.velocity.x = 0;
        cell.body.velocity.y = 0;
        
        var scaler = cell.scale.x - 0.005;
        cell.scale.x = scaler;
        cell.scale.y = scaler;
        cell.body.setCircle(235 * scaler); //Radius of art asset * scale factor

        if(cell.scale.x < 0)
        {
            cell.s_isDead = true;
            cell.scale.x = 0;
            cell.scale.y = 0;
            cell.destroy();
            cell.body.destroy();
        }
    }
    else
    {
        var arrayLength = cell.children.length;
        for (var i = 0; i < arrayLength; i++) {
            cell.children[i].alpha -= 0.05;
            if(cell.children[i].alpha <= 0.0)
            {
                cell.s_isDead = true;
            }
        }
    }
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
        var spriteFront = game.add.sprite(0, 0, getCellArt(cellSize, cellType, front=true));
        spriteFront.anchor.x = 0.5;
        spriteFront.anchor.y = 0.5;
        spriteFront.alpha = 0.0;
        sprite.addChild(spriteFront);
    }


    // Give it a random velocity to start with.
    sprite.body.velocity.x = randomNb(-200, 200)
    sprite.body.velocity.y = randomNb(-200, 200)

    sprite.s_cellType =cellType;
    sprite.s_size = cellSize;
    sprite.s_art_scale = getCellArtScale(sprite.s_size);

    // Physics properties
    sprite.body.setCircle(235 * sprite.s_art_scale); // Pixel radius of art asset * scaler
    sprite.body.linearDamping = CELL_LINEAR_DAMPING;
    sprite.body.fixedRotation = true;
    //sprite.body.collideWorldBounds = false;

    // Game properties
    if(sprite.s_cellType == "red")
    {
        sprite.s_agroDistance = CELL_AGRO_DISTANCE_RED;
    }
    else
    {
        sprite.s_agroDistance = CELL_AGRO_DISTANCE;
    }
    sprite.s_isChasing = false;
    sprite.scale.set(sprite.s_art_scale);
    sprite.s_isDying = false;
    sprite.s_isDead = false;
    sprite.s_lastDirectionChangeTimer = 0.0;
    sprite.s_lastDirectionX = 0.0;
    sprite.s_lastDirectionY = 0.0;
    sprite.s_lastSpeed = 0.0;

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

        // Choose direction
        var x = 0.0;
        var y = 0.0;
        var speed = 0.0;
        var acceleration = 0.0;
        if(this.s_isChasing)
        {
            // Get normalized vector towards player
            x = virus.x - this.x;
            y = virus.y - this.y;
            var norm = Math.sqrt(x * x + y * y);
            if (norm != 0) { // as3 return 0,0 for a point of zero length
                x = x / norm;
                y = y / norm;
            }

            speed = CELL_SPEED;
            acceleration = CELL_ACCELERATION;

            if(this.s_cellType == "red")
            {
                acceleration = CELL_ACCELERATION_RED;
            }

            // Smaller cells run away!
            if(this.s_size <= virus.s_size)
            {
                x = x * -1.0;
                y = y * -1.0;
                acceleration = CELL_ACCELERATION * 0.5;
            }
        }
        else
        {
            // Not chasing, just wandering around
            this.s_lastDirectionChangeTimer += game.time.elapsedMS;
            if (this.s_lastDirectionChangeTimer > 5000)
            {
                this.s_lastDirectionChangeTimer = 0.0;
                sprite.s_lastDirectionX = (Math.random() - 0.5);
                sprite.s_lastDirectionY = (Math.random() - 0.5);
                sprite.s_lastSpeed = Math.random() * CELL_SPEED * 0.1; // Slow
            }

            x = sprite.s_lastDirectionX;
            y = sprite.s_lastDirectionY;
            speed = sprite.s_lastSpeed;
            acceleration = CELL_ACCELERATION * 0.5;
        }

        // Accelerate to speed
        if (sprite.s_cellType == "white")
        {
            // Set velocity to vector directly
            this.body.velocity.x = x * speed;
            this.body.velocity.y = y * speed;
        } else {

            // x
            velocity = this.body.velocity.x;
            velocity += acceleration * x;
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
            velocity += acceleration * y;
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
    };

    sprite.updateRotation = function(){
        if(this.s_cellType == "white")
        {
            // Rotate front sprite
            var arrayLength = this.children.length;
            for (var i = 0; i < arrayLength; i++) {
                this.children[i].angle += 0.1;
                this.children[i].angle += 0.1;
            }
            // Rotate back sprite
            this.body.angularVelocity = -0.1;
        }
    }

    sprite.updateArt = function(){
        if(this.s_cellType == "red")
        if(this.s_isChasing)
        {
            var arrayLength = this.children.length;
            for (var i = 0; i < arrayLength; i++) {
                if(this.children[i].alpha < 1.0)
                {
                    this.children[i].alpha += 0.05;
                }
                
            }
        }
        else
        {
             var arrayLength = this.children.length;
            for (var i = 0; i < arrayLength; i++) {
                if(this.children[i].alpha > 0.0)
                {
                    this.children[i].alpha -= 0.05;
                }
            }
        }
    }

    // Collide with virus
    sprite.body.setBodyContactCallback(state.virus.body, collideWithEnemy, this);

    // Collide with other cells
    if (sprite.s_cellType == "red")
    {
        sprite.body.setCategoryContactCallback(1, collideWithOtherCell, this);
        sprite.body.setCollisionCategory(1);
    }

    return sprite;
}

var spawnLocations = [
  [700, 1300],
  [2800, 1100],
  [4140, 320],
  [5000, 2200],
  [3175, 3900],
  [3000, 6000],
]
var miniSpawnLocations = [
  [4800, 960],
  [3400, 660],
  [22300, 640],
  [1200, 470],
  [740, 1800],
  [3800, 130],
  [3300, 270],
]

var handPlacedReds = [
    [1860, 400, 1],
    [1760, 420, 1],
    [1690, 430, 1],
    [1900, 520, 40],
]

var TOTAL_ENEMIES = 50 * spawnLocations.length;
var TOTAL_ENEMIES_MINI = 3 * miniSpawnLocations.length;

/**
 * Returns a "random" number between 0 and 4 giving preference to smaller numbers.
 */
function getRandomEnemySize() {
  var SMALL_THRESHOLD = 75;
  var MEDIUM_THRESHOLD = 90;

  var nb = randomNb(0, 100);
  if(nb < SMALL_THRESHOLD) {
    return 0;
  } else if (nb < MEDIUM_THRESHOLD) {
    return randomNb(1,2);
  } else {
    return randomNb(3,4);
  }
}

function createEnemies(virus) {
    var cells = game.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.BOX2D;

    // Major spawns
    for (var i = 0; i < TOTAL_ENEMIES; i++) {
      var randomSpawnpoint = spawnLocations[Math.floor(Math.random()*spawnLocations.length)]
      var x = randomSpawnpoint[0] + (Math.random() * 300);
      var y = randomSpawnpoint[1] + (Math.random() * 300); 

      var nb = getRandomEnemySize();
      var size = (nb * 20) + 1;

      var cellType = "red";
      var nb = randomNb(0, 100);
      if(nb > 90) {
          cellType = "white";
      }

      enemy = createEnemy(i, x, y, cells, cellType, size);
    }

    // Minor spawns
    for (var i = 0; i < TOTAL_ENEMIES_MINI; i++) {
      var randomSpawnpoint = miniSpawnLocations[Math.floor(Math.random()*miniSpawnLocations.length)]
      var x = randomSpawnpoint[0];
      var y = randomSpawnpoint[1]; 

      var nb = getRandomEnemySize();
      var size = (nb * 20) + 1;

      var cellType = "red";
      var nb = randomNb(0, 100);
      if(nb > 90) {
          cellType = "white";
      }

      enemy = createEnemy(i, x, y, cells, cellType, size);
    }

    // Hand placed
    for (var i = 0; i < handPlacedReds.length; i++) {
        var spawnPoint = handPlacedReds[i];
        var x = spawnPoint[0];
        var y = spawnPoint[1];
        var size = spawnPoint[2]

        enemy = createEnemy(i, x, y, cells, "red", size);
    }

    // One white for every major spawn location
     for (var i = 0; i < spawnLocations.length; i++) {
        var spawnPoint = spawnLocations[i];
        var x = spawnPoint[0];
        var y = spawnPoint[1];
        var nb = randomNb(2,4);
        var size = (nb * 20) + 1;

        enemy = createEnemy(i, x, y, cells, "white", size);
     }


    return cells;
}
