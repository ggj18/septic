
function onCollision(body1, body2, fixture1, fixture2, begin) {
    // If 'begin' is true this is a begin contact, otherwise a contact has just ended    ... do something
    if (begin){
        // body1 == enemy, body2 == ship
        if (body1.sprite.size > body2.sprite.size)
        {
        	body1.sprite.eat(body2.sprite);
        }
        else
        {
			body2.sprite.eat(body1.sprite);
        }
    }
}