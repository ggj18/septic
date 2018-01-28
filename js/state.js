var bootState = {
  create: function () {
    // createWebFontConfig(game)
    game.physics.startSystem(Phaser.Physics.BOX2D);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.state.start('splash');
  }
}

var playState = {
    preload: preload,
    create: create,
    update: update,
    render: render
};

var splashState = {
  create: function () {
    stateCommon(this);
    var startText = createText(game, overlayMsg.start);
    game.state.add('play', playState);
  },
  update: function () {
    checkSpacePressed();
  }
}

var winState = {
  create: function () {
    stateCommon(this);
    createText(game, overlayMsg.win);
  },
  update: function () {
    checkSpacePressed();
  }
}

var loseState = {
  create: function () {
    // game.world.scale.setTo(1, 1);
    stateCommon(this);
    var loseText = createText(game, overlayMsg.lose);
  },
  update: function () {
    checkSpacePressed();
  }
}

var overlayMsg = {
    start: 'Infect cells smaller than you,\nlarger white cells will kill you.\nPress space to start.',
    win: 'You WIN!!!\nPress space to restart.',
    lose: 'You LOSE!!!\nPress space to restart.'
}
