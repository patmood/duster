(function() {
  'use strict';

  var Plane = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player', 0)
    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true

    this.anchor.setTo(0.5, 0.5)
    this.width = 50
    this.height = 10

    this.ROTATION_SPEED = 110; // degrees/second
    this.ROTATION_ACCELERATION = 110; // degrees/second
    this.ACCELERATION = 600; // pixels/second/second
    this.MAX_SPEED = 400; // pixels/second
    this.DRAG = 50; // pixels/second
    this.BOOST_VECTOR = 0.8 // rotation that acceleration is applied
    // Set maximum velocity
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED)
    this.body.drag.setTo(this.DRAG, this.DRAG); // x, y

    // Smoke
    this.smokeEmitter = this.game.add.emitter(0, 0, 100)
    this.smokeEmitter.makeParticles('smoke')
    this.smokeEmitter.start(false, 1000, 40)

    this.isBoosting = false
  }

  Plane.prototype = Object.create(Phaser.Sprite.prototype)
  Plane.prototype.constructor = Plane

  Plane.prototype.update = function() {
    this.smokeEmitter.x = this.x
    this.smokeEmitter.y = this.y

    if (this.isBoosting) {
      this.body.angularVelocity = -this.ROTATION_SPEED
      this.body.acceleration.x = Math.cos(this.rotation - this.BOOST_VECTOR) * this.ACCELERATION;
      this.body.acceleration.y = Math.sin(this.rotation - this.BOOST_VECTOR) * this.ACCELERATION;

    } else {
      this.body.acceleration.set(0)
      this.body.angularVelocity = Math.cos(this.rotation + 0.5) *100
    }
  }


  window['duster'] = window['duster'] || {}
  window['duster'].Plane = Plane

}());
