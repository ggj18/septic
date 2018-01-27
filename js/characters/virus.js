
// Get the linear interpolation between two value
function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function getVirusArt(size, front=true){
    if(size <= 30)
    {
        if(front) return "virusSmallFront";
        else return "virusSmallBack";
    }
    else if(size <= 60)
    {
        if(front) return "virusMidFront";
        else return "virusMidBack";
    }
    else
    {
        if(front) return "virusLargeFront";
        else return "virusLargeBack";
    }
}

function getVirusArtScale(size){
    // The size determines the scaler for art/physics
    // Map size 1-100 to 0.1-1.0
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

function growVirus(enemySize)
{
	var virus = state.virus;
	virus.s_size += 1;
	// We can't update our circle size mid-collision, else we crash the physics. Do it in a future update cycle
	virus.s_doUpdateSize = true;
	virus.angularVelocity += 0.5;
}

function shrinkVirus(enemySize)
{
	var virus = state.virus;
	virus.s_size -= 10;
	// We can't update our circle size mid-collision, else we crash the physics. Do it in a future update cycle
	virus.s_doUpdateSize = true;
	virus.angularVelocity -= 0.5;

	if(virus.s_size <= 1)
	{
		virus.s_size = 1;
		lose();
	}
}

function updateVirusSize(virus)
{
	// Update textures
	virus.loadTexture(getVirusArt(virus.s_size, front=false));
	virus.children[0].loadTexture(getVirusArt(virus.s_size, front=true));

	// Update art scale
	virus.s_art_scale = getVirusArtScale(virus.s_size);
    virus.scale.set(virus.s_art_scale);

    // Update physics circle
    virus.body.setCircle(250 * virus.s_art_scale); //Radius of art asset * scale factor

    /*
	// Update game world scale
	// Size 1 = scale 1. Size 10 = scale 0.4
    if(virus.s_size <= 3)
    {
        game.world.scale.setTo(1.0, 1.0);
    }
    else if(virus.s_size <= 6)
    {
        game.world.scale.setTo(0.7, 0.7);
    }
    else
    {
        game.world.scale.setTo(0.4, 0.4);
    }
    */

    virus.s_doUpdateSize = false;
}

function createVirus() {

    var virus = game.add.sprite(1770, 125, getVirusArt(1, front=false));
    var spriteFront = game.add.sprite(0, 0, getVirusArt(1, front=true));
    spriteFront.anchor.x = 0.5;
    spriteFront.anchor.y = 0.5;
    virus.addChild(spriteFront);

    // Gameplay properties
    virus.smoothed = false;
    virus.s_size = 2; //Min = 2, Max = 10
    virus.s_doUpdateSize = false;

    // Physics properties
    game.physics.box2d.enable(virus, false);
    virus.body.linearDamping = CELL_LINEAR_DAMPING;
    //virus.body.collideWorldBounds = false;

    updateVirusSize(virus);

    return virus
}
