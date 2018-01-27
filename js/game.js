function win() {
  game.state.start('win')
}

function lose() {
  game.state.start('lose')
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
