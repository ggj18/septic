
// Get the linear interpolation between two value
function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function getVirusArt(size, front=true){
    if(size <= 3)
    {
        if(front) return "virusSmallFront";
        else return "virusSmallBack";
    }
    else if(size <= 6)
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
    // Map size 1-10 to 0.1-1.0
    return (size - 1) / 20.0;
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
	virus.s_size -= 1;
	// We can't update our circle size mid-collision, else we crash the physics. Do it in a future update cycle
	virus.s_doUpdateSize = true;
	virus.angularVelocity -= 0.5;

	if(virus.s_size <= 1)
	{
		virus.s_size = 1;
		//TODO
		//Lose();
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
    virus.body.setCircle(235 * virus.s_art_scale); //Radius of art asset * scale factor

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

    virus.s_doUpdateSize = false;
}

function createVirus() {

    var virus = game.add.sprite(200, 200, getVirusArt(1, front=false));
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
