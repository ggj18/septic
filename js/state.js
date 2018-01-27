var playState = { preload: preload, create: create, update: update, render:
  render };

var bootState = {
  create: function () {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.state.start('splash');
  }
}

var splashState = {
  create: function () {
    addText('You can eat things smaller than you. Bigger white cells will kill you. Press space to start.');
    stateCommon(this);
    game.state.add('play', playState);
  },
  update: function () {
    checkSpacePressed();
  }
}

var winState = {
  create: function () {
    addText('You WIN!!! Press space to restart.');
    stateCommon(this);
  },
  update: function () {
    checkSpacePressed();
  }
}

var loseState = {
  create: function () {
    addText('You LOSE!!! Press space to restart.');
    stateCommon(this);
  },
  update: function () {
    checkSpacePressed();
  }
}
