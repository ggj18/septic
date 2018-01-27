function win() {
  game.state.start('win')
}

function lose() {
  console.log(game.state)
  game.state.start('lose')
}

function addText(text) {
    game.add.text(0,  0, text, { fill: '#ffffff', font: '14pt Arial' });
}

var playState = { preload: preload, create: create, update: update, render:
  render };

var bootState = {
  create: function () {
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.state.start('splash')
  }
}

var splashState = {
  create: function () {
    addText('Press space to start.');
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function () {
    if(this.space.isDown) {
      game.state.start('play')
    }
  }
}

var winState = {
  create: function () {
    addText('You WIN! Press space to restart.');
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function () {
    if(this.space.isDown) {
      game.state.start('play')
    }
  }
}

var loseState = {
  create: function () {
    addText('You LOSE!!! Press space to restart.');
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function () {
    if(this.space.isDown) {
      game.state.start('play')
    }
  }
}
