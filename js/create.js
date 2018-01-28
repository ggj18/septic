/**
 * This variable contains all global state.
 */
state = {
  virus: null,
  cells: null,
  heart: null
};

CAMERA_ZOOM_TIME = 3000; // milliseconds

// Get the linear interpolation between two value
function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function setCameraZoomTarget(zoomTarget)
{
    game.s_camZoomAmountStart = game.s_camZoomAmount;
    game.s_camZoomAmountTarget = zoomTarget;
    game.s_camZoomTimer = 0.0;
}

function updateCameraZoom()
{
    // Animate zoom to target zoom
    if(game.s_camZoomAmount == game.s_camZoomAmountTarget)
    {
        return;
    }

    game.s_camZoomTimer += game.time.elapsedMS;
    game.s_camZoomAmount = lerp(game.s_camZoomAmountStart, game.s_camZoomAmountTarget, game.s_camZoomTimer / CAMERA_ZOOM_TIME);
    if (game.s_camZoomTimer > CAMERA_ZOOM_TIME)
    {
        game.s_camZoomAmount == game.s_camZoomAmountTarget;
    }

    updateCamera();
}

function updateCamera()
{
    game.camera.scale.x = game.s_camScaleX + game.s_camZoomAmount;
    game.camera.scale.y = game.s_camScaleY + game.s_camZoomAmount;

    game.camera.bounds.x = game.s_camBoundsX * game.camera.scale.x;
    game.camera.bounds.y = game.s_camBoundsY * game.camera.scale.y;
    game.camera.bounds.width = game.s_camBoundsWidth * game.camera.scale.x;
    game.camera.bounds.height = game.s_camBoundsHeight * game.camera.scale.y;
}

function create() {
    alreadyInfectedHeart = false
    game.physics.box2d.restitution = 0.9;
    game.world.setBounds(0, 0, 5600, 7000);
    game.physics.box2d.setBoundsToWorld();
    game.stage.backgroundColor = '#ffffff';
    game.world.scale.setTo(0.5, 0.5);

    createBackground();
    state.virus = createVirus();
    state.cells = createEnemies(state.virus);
    state.hearte = createHeart();
    state.heartDying = false;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(state.virus, Phaser.Camera.FOLLOW_TOPDOWN);

    // Start zoomed in
    game.s_camZoomAmount = 1.0;
    game.s_camZoomAmountStart = 1.0;
    game.s_camZoomAmountTarget = 1.0;
    game.s_camZoomTimer = 0.0;

    // Store original camera values
    game.s_camScaleX = game.camera.scale.x;
    game.s_camScaleY = game.camera.scale.y;
    game.s_camBoundsX = game.camera.bounds.x;
    game.s_camBoundsY = game.camera.bounds.y;
    game.s_camBoundsWidth = game.camera.bounds.width;
    game.s_camBoundsHeight = game.camera.bounds.height;

    updateCamera();
}
