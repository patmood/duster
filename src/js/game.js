(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {

      this.ROTATION_SPEED = 70; // degrees/second
      this.ROTATION_ACCELERATION = 90; // degrees/second
      this.ACCELERATION = 600; // pixels/second/second
      this.MAX_SPEED = 400; // pixels/second
      this.DRAG = 50; // pixels/second
      this.GRAVITY = 200; // pixels/second/second

      // Add the player to the stage
      this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      // this.player.angle = -90; // Point the player up
      this.player.width = 50
      this.player.height = 10

      // Enable physics on the player
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      // Set maximum velocity
      this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED)

      // Add drag to the player that slows it down when it is not accelerating
      this.player.body.drag.setTo(this.DRAG, this.DRAG); // x, y

      // Turn on gravity
      this.game.physics.arcade.gravity.y = this.GRAVITY;

      // Make player bounce a little
      this.player.body.bounce.setTo(0.25, 0.25);

      // Input
      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {

      // Keep the player on the screen
      if (this.player.x > this.game.width) this.player.x = 0
      if (this.player.x < 0) this.player.x = this.game.width
      if (this.player.y > this.game.height) this.player.y = 0
      if (this.player.y < 0) this.player.y = this.game.height

      // Constrain velocity
      // this.player.body.velocity.y = Math.sin(this.player.rotation) * this.player.body.speed
      // this.player.body.velocity.x = Math.cos(this.player.rotation) * this.player.body.speed

      if (this.input.activePointer.isDown) {
        this.player.body.angularVelocity = -this.ROTATION_SPEED
        this.player.body.acceleration.x = Math.cos(this.player.rotation - 0.8) * this.ACCELERATION;
        this.player.body.acceleration.y = Math.sin(this.player.rotation - 0.8) * this.ACCELERATION;
      } else {
        this.player.body.acceleration.set(0)
        this.player.body.angularVelocity = Math.cos(this.player.rotation + 0.5) * 100
      }


    },

    onInputDown: function () {
    },

    render: function() {
      this.game.debug.text('Vx: ' + this.player.body.velocity.x.toFixed(), 10, 20)
      this.game.debug.text('Vy: ' + this.player.body.velocity.y.toFixed(), 10, 40)
      this.game.debug.text('Rotation: ' + this.player.rotation.toFixed(1), 10, 60)
      this.game.debug.text('Speed: ' + this.player.body.speed.toFixed(), 10, 80)
    }

  };

  window['duster'] = window['duster'] || {};
  window['duster'].Game = Game;

}());
