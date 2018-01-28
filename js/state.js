var bootState = {
  preload: preload,
  create: function () {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.state.start('splash');
  }
}

var playState = {
    create: create,
    update: update,
    render: render
};

var splashState = {
  create: function () {
    stateCommon(this);
    var titleScreen = game.add.sprite(0, 0, 'titleScreen');
    game.state.add('play', playState);
  },
  update: function () {
    checkSpacePressed();
  }
}

var winState = {
  create: function () {
    stateCommon(this);
    var winScreen = game.add.sprite(0, 0, 'winScreen');
  },
  update: function () {
    checkSpacePressed();
  }
}

var loseState = {
  create: function () {
    stateCommon(this);
    var loseScreen = game.add.sprite(0, 0, 'loseScreen');
  },
  update: function () {
    checkSpacePressed();
  }
}

var overlayMsg = {
    start: 'Infect cells smaller than you\nLarger white cells will kill you\nPress space to start.',
    win: 'You WIN!!!\nPress space to restart.',
    lose: 'You LOSE!!!\nPress space to restart.'
}
