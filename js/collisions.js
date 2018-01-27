
function collideWithEnemy(enemyCellBody, virus, fixture1, fixture2, begin) {

  if(!begin) {
    return;
  }

  virusSize = virus.sprite.s_size;
  console.log(virusSize, enemyCellBody.sprite.s_size);
  
}

function killCell(enemyCellBody, virusBody) {
  enemyCellBody.sprite.destroy();
  enemyCellBody.destroy();

  virus.angularVelocity += 0.5;
}
