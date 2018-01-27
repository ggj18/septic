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
    createText(game, overlayMsg.start);
    stateCommon(this);
    game.state.add('play', playState);
  },
  update: function () {
    checkSpacePressed();
  }
}

var winState = {
  create: function () {
    createText(game, overlayMsg.win);
    stateCommon(this);
  },
  update: function () {
    checkSpacePressed();
  }
}

var loseState = {
  create: function () {
    createText(game, overlayMsg.lose);
    stateCommon(this);
  },
  update: function () {
    checkSpacePressed();
  }
}

var overlayMsg = {
    start: 'You can eat things smaller than you,\nbigger things kill you.\nPress space to start.',
    win: 'You WIN!!!\nPress space to restart.',
    lose: 'You LOSE!!!\nPress space to restart.'
}
