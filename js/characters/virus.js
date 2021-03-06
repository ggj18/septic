

function getVirusArt(size, front=true){
	if(size < 10)
	{
		return "virusTiny";
	}
    else if(size < 30)
    {
        if(front) return "virusSmallFront";
        else return "virusSmallBack";
    }
    else if(size < 50)
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
    return lerp(0.05, 0.5, size / 100);
}

alreadyInfectedHeart = false
function growVirus(enemySize)
{
	var virus = state.virus;
	virus.s_size += 1;
	// We can't update our circle size mid-collision, else we crash the physics. Do it in a future update cycle
	virus.s_doUpdateSize = true;
	virus.angularVelocity += 0.5;

	// Update camera zoom at certain intervals
	var zoomOutSizes = [30, 31, 60, 61, 90, 91, 100];
	if(zoomOutSizes.indexOf(virus.s_size) != -1)
	{
    	var zoomTarget = lerp(1.0, 0.0, virus.s_size / 100);
    	setCameraZoomTarget(zoomTarget);
    }

	if(virus.s_size >= 90) {
          if (!alreadyInfectedHeart) {
            var t = game.add.text(420, 40, 'Infect the heart!', { fill: '#ffffff', font: '32pt Arial' });
            t.fixedToCamera = true;
            t.cameraOffset.setTo(420, 40);
          }

          alreadyInfectedHeart = true;
	}
}

function shrinkVirus(enemySize)
{
	lose();
	/*
	var virus = state.virus;
	virus.s_size -= 100;
	// We can't update our circle size mid-collision, else we crash the physics. Do it in a future update cycle
	virus.s_doUpdateSize = true;
	virus.angularVelocity -= 0.5;

	// Update camera zoom always
    var zoomTarget = lerp(1.0, 0.0, virus.s_size / 100);
    setCameraZoomTarget(zoomTarget);

	if(virus.s_size <= 1)
	{
		virus.s_size = 1;
		lose();
	}
	*/
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

    // Update camera zoom
    var zoomTarget = lerp(1.0, 0.0, virus.s_size / 100);
    setCameraZoomTarget(zoomTarget);

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
