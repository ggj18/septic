function createWebFontConfig (game) {
  return {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () { game.time.events.add(Phaser.Timer.SECOND, createText, this) },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Press Start 2P']
    }
  }
}

function createText (game, textContent) {
    var textAttributes = {}

  var posX = 512
  var posY = 384

  var defaults = {
    // font: 'Arial',
    fontSize: 2000,
    align: 'center',
    stroke: '#000000',
    strokeThickness: 1,
    fill: "#8ED6FF"
  }

  var text = game.add.text(posX, posY, textContent, defaults)

  if(!textAttributes.noGradient) {
    var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height)
    grd.addColorStop(0, '#8ED6FF')
    grd.addColorStop(1, '#004CB3')
    text.fill = grd
  }

  text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5)
  text.anchor.setTo(0.5)
  text.inputEnabled = true

  return text
}
