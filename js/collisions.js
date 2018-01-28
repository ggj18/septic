
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
        killCell(enemyCellBody);
    }
    else if(enemyCellBody.sprite.s_cellType == "white" && enemyCellBody.sprite.s_size > virusBody.sprite.s_size)
    {
        shrinkVirus(enemyCellBody.sprite.s_size);
    }
    // else bounce off
  
}

function collideWithOtherCell(body, bodyB, shapeA, shapeB, equation, object)
{
    if(body.sprite == null || bodyB.sprite == null){
        return;
    }

    if(!body.sprite.s_isDying || body.sprite.s_cellType != "red" || bodyB.sprite.s_cellType != "red"){
        return;
    }

    if(bodyB.sprite.s_isDying)
    {
        return;
    }

    killCell(bodyB);
}

function killCell(enemyCellBody) {

    growVirus(enemyCellBody.sprite.s_size);
    killEnemy(enemyCellBody.sprite);
}

function collideWithHeart(heart, virus, fixture, fixture2, begin) {
  if(!begin) {
    return;
  }

  if(virus.sprite.s_size >= 90) {
    if(!state.heartDying) {
        state.heart.loadTexture("heart1i", 0);

        // Kill all enemies
        var arrayLength = state.cells.children.length;
        for (var i = 0; i < arrayLength; i++) {
            var cell = state.cells.children[i];
            if(cell == undefined) continue;
            if(!cell.s_isDying && !cell.s_isDead)
            {
                killEnemy(cell);
            }
        }
    }
    state.heartDying = true;
  }
}
