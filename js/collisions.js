
function collideWithEnemy(enemyCellBody, virus, fixture1, fixture2, begin) {

    if(!begin) {
        return;
    }

    if(virus.sprite.s_size > enemyCellBody.sprite.s_size)
    {
        killCell(enemyCellBody, virus.body);
    }
  
}

function killCell(enemyCellBody, virusBody) {

    growVirus(enemyCellBody.sprite.s_size);
    enemyCellBody.sprite.destroy();
    enemyCellBody.destroy();
}
