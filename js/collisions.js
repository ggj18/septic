
function collideWithEnemy(enemyCellBody, virus, fixture1, fixture2, begin) {

  if(!begin) {
    return;
  }

  enemyCellBody.sprite.destroy();
  enemyCellBody.destroy();

}
