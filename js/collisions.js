
function collideWithEnemy(enemyCellBody, virusBody, fixture1, fixture2, begin) {

    if(!begin) {
        return;
    }

    if(enemyCellBody.sprite == null){
        return;
    }

    if(enemyCellBody.sprite.s_isDying || enemyCellBody.sprite.s_isDead) {
        return;
    }

    if(virusBody.sprite.s_size > enemyCellBody.sprite.s_size)
    {
        killCell(enemyCellBody, virusBody);
    }
    else if(enemyCellBody.sprite.s_cellType == "white" && enemyCellBody.sprite.s_size > virusBody.sprite.s_size)
    {
        shrinkVirus(enemyCellBody.sprite.s_size);
    }
    // else bounce off
  
}

function killCell(enemyCellBody, virusBody) {

    growVirus(enemyCellBody.sprite.s_size);
    enemyCellBody.sprite.s_isDying = true;
    //enemyCellBody.sprite.destroy();
    //enemyCellBody.destroy();
}
