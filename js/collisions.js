
function collideWithEnemy(enemyCellBody, virusBody, fixture1, fixture2, begin) {

    if(!begin) {
        return;
    }

    if(virusBody.sprite.s_size > enemyCellBody.sprite.s_size)
    {
        killCell(enemyCellBody, virusBody);
    }
    else if(enemyCellBody.sprite.s_size > virusBody.sprite.s_size)
    {
        shrinkVirus(enemyCellBody.sprite.s_size);
    }
    // else bounce off
  
}

function killCell(enemyCellBody, virusBody) {

    growVirus(enemyCellBody.sprite.s_size);
    enemyCellBody.sprite.destroy();
    enemyCellBody.destroy();
}
