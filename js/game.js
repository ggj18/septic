function win() {
}

function lose() {
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
    game.add.text(5,  5, 'Press space to start.', { fill: '#ffffff', font: '14pt Arial' });
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function () {
    if(this.space.isDown) {
      game.state.start('play')
    }
  }
}
