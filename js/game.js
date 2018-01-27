function win() {
  game.state.start('win')
}

function lose() {
  game.state.start('lose')
}

function addText(text) {
    game.add.text(0,  0, text, { fill: '#ffffff', font: '14pt Arial' });
}

function stateCommon(obj) {
    game.stage.backgroundColor = '#000000';
}

var space = null;

function checkSpacePressed() {
    if(space.isDown) {
      game.state.start('play');
    }
}

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
    addText('Press space to restart.');
    stateCommon(this);
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
