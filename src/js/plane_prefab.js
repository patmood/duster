(function() {
  'use strict';

  var Plane = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player', 0)
    console.log('plane made!')
  }

  Plane.prototype = Object.create(Phaser.Sprite.prototype)
  Plane.prototype.constructor = Plane

  Plane.prototype.update = function() {
  }

  window['duster'] = window['duster'] || {}
  window['duster'].Plane = Plane

}());
