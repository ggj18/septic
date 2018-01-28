function createHeart() {
  var spawnX = 2832;
  var spawnY = 1977;

  var heart = game.add.sprite(spawnX, spawnY, 'heart1');
  heart.anchor.x = 0.5;
  heart.anchor.y = 0.5;
  var heart2 = game.add.sprite(0, 0, 'heart2');
  heart2.anchor.x = 0.5;
  heart2.anchor.y = 0.5;
  var heart3 = game.add.sprite(0, 0, 'heart3');
  heart3.anchor.x = 0.5;
  heart3.anchor.y = 0.5;
  var heart4 = game.add.sprite(0, 0, 'heart4');
  heart4.anchor.x = 0.5;
  heart4.anchor.y = 0.5;

  heart.addChild(heart2);
  heart2.addChild(heart3);
  heart3.addChild(heart4);

  state.heart = heart
  state.heart2 = heart2
  state.heart3 = heart3
  state.heart4 = heart4
  game.physics.box2d.enable(heart, true);
  heart.body.static = true
  heart2.body.static = true
  heart3.body.static = true
  heart4.body.static = true

  heart.body.setCircle(50);

  heart.body.setBodyContactCallback(state.virus.body, collideWithHeart, this);

  return heart

}
