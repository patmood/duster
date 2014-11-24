(function() {
  'use strict';

  function Game() {
  }

  Game.prototype = {

    create: function () {
      this.GRAVITY = 200; // pixels/second/second

      this.game.world.setBounds(0, 0, 5000, 600)
      this.game.add.tileSprite(0, 0, 5000, 600, 'bg')
      this.ground = this.game.add.tileSprite(0, this.game.height - 10, 99999, 10, 'player')

      // Add the plane
      this.plane = new window['duster'].Plane(this.game, 100, 100)
      this.game.add.existing(this.plane)

      // Enable physics on
      this.game.physics.arcade.enableBody(this.ground)
      this.ground.body.immovable = true
      this.ground.body.allowGravity = false

      // Turn on gravity
      this.game.physics.arcade.gravity.y = this.GRAVITY;

      // Input
      this.input.onDown.add(this.onInputDown, this);

      this.game.camera.follow(this.plane)
    },

    update: function () {
      this.game.physics.arcade.collide(this.plane, this.ground)
      this.plane.isBoosting = this.input.activePointer.isDown

    },

    onInputDown: function () {
    },

    render: function() {
      // this.game.debug.text('Vx: ' + this.player.body.velocity.x.toFixed(), 10, 20)
      // this.game.debug.text('Vy: ' + this.player.body.velocity.y.toFixed(), 10, 40)
      // this.game.debug.text('Rotation: ' + this.player.rotation.toFixed(1), 10, 60)
      // this.game.debug.text('Speed: ' + this.player.body.speed.toFixed(), 10, 80)
      this.game.debug.spriteCoords(this.plane, 300, 500)
      this.game.debug.cameraInfo(this.game.camera, 32, 64)
    }

  };

  window['duster'] = window['duster'] || {};
  window['duster'].Game = Game;

}());
