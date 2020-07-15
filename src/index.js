import Phaser from "phaser";
import levels from "./levels";
import gameStatus from "./statusModule";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1024,
  height: 768,
  pixelArt: true,
  backgroundColor: '#9bd4e8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1200
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let keys;
let maxVelX;
let accelerationX;
let jumpVel;
let maxDashDistance;
let dashDistance;
let shadowKillTimer;

function preload() {
  keys = this.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE');
  maxVelX = 200;
  accelerationX = 20;
  jumpVel = 600;
  maxDashDistance = 15;
  dashDistance = maxDashDistance;
  shadowKillTimer = 6;

  this.load.image('white', '../src/assets/white-square.png');
  this.load.image('spinesup', '../src/assets/spinesup.png');
  this.load.image('spinesdown', '../src/assets/spinesdown.png');
  this.load.image('spinesleft', '../src/assets/spinesleft.png');
  this.load.image('spinesright', '../src/assets/spinesright.png');
  this.load.image('top-tile', '../src/assets/grassy-red-sand-tile.png');
  this.load.image('tile', '../src/assets/red-sand-tile.png');
  this.load.image('goal', '../src/assets/goal-flag.png');
  this.load.image('montyjumpleft', '../src/assets/monty-jump-left.png');
  this.load.image('montyjumpright', '../src/assets/monty-jump-right.png');
  this.load.spritesheet('monty',
    '../src/assets/Monty.png', {
      frameWidth: 8,
      frameHeight: 16
    });
}

function create() {
  levels.load(0, this);
}

function update() {
  if (shadowKillTimer > 0) {
    shadowKillTimer -= 1;
  } else {
    shadowKillTimer = 6;
    gameStatus.playerDashShadow.killAndHide(gameStatus.playerDashShadow.getFirstAlive());
  }
  if (gameStatus.finishLevel) {
    levels.coverScene();
  } else {
    levels.uncoverScene();
  }

  if (gameStatus.isDashing) {
    gameStatus.player.setScale(4, 2.7);
  } else {
    gameStatus.player.setScale(3)
  }

  if (keys.SHIFT.isUp && gameStatus.player.body.touching.down) {
    dashDistance = maxDashDistance;
  }

  if (keys.A.isDown) {
    gameStatus.facing = 'left';
    if (keys.SHIFT.isDown && dashDistance > 0) {
      if (dashDistance % 3 === 0) {
        gameStatus.playerDashShadow.create(gameStatus.player.x, gameStatus.player.y, 'montyjumpleft').setScale(4, 2.7);
      }
      gameStatus.player.setVelocityX(-maxVelX * 2.5);
      gameStatus.player.setVelocityY(0);
      gameStatus.isDashing = true;
      dashDistance -= 1;
      if (gameStatus.facing === 'left') {
        gameStatus.player.anims.play('jumpleft', true);
      } else if (gameStatus.facing === 'right') {
        gameStatus.player.anims.play('jumpright', true);
      }
    } else {
      gameStatus.isDashing = false;
      if (gameStatus.player.body.velocity.x < Math.abs(maxVelX)) {
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x - accelerationX);
      }
      if (gameStatus.player.body.velocity.x < -1 * maxVelX)
        gameStatus.player.setVelocityX(-1 * maxVelX);
    }
    gameStatus.player.anims.play('left', true);
  } else if (keys.D.isDown) {
    gameStatus.facing = 'right';
    if (keys.SHIFT.isDown && dashDistance > 0) {
      if (dashDistance % 3 === 0) {
        gameStatus.playerDashShadow.create(gameStatus.player.x, gameStatus.player.y, 'montyjumpright').setScale(4, 2.7);
      }

      gameStatus.player.setVelocityX(maxVelX * 2.5);
      gameStatus.player.setVelocityY(0);
      gameStatus.isDashing = true;
      dashDistance -= 1;
    } else {
      gameStatus.isDashing = false;
      if (gameStatus.player.body.velocity.x < maxVelX) {
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x + accelerationX);
      }
      if (gameStatus.player.body.velocity.x > maxVelX)
        gameStatus.player.setVelocityX(maxVelX);
    }
    gameStatus.player.anims.play('right', true);
  } else {
    if (keys.SHIFT.isDown && dashDistance > 0) {
      if (gameStatus.facing == 'right') {
        console.log("DASHING RIGHT");
        if (dashDistance % 3 === 0) {
          gameStatus.playerDashShadow.create(gameStatus.player.x, gameStatus.player.y, 'montyjumpright').setScale(4, 2.7);
        }

        gameStatus.player.setVelocityX(maxVelX * 2.5);
        gameStatus.player.setVelocityY(0);
        gameStatus.isDashing = true;
        dashDistance -= 1;
      } else {
        console.log("DASHING LEFT");
        if (dashDistance % 3 === 0) {
          gameStatus.playerDashShadow.create(gameStatus.player.x, gameStatus.player.y, 'montyjumpleft').setScale(4, 2.7);
        }

        gameStatus.player.setVelocityX(maxVelX * 2.5 * -1);
        gameStatus.player.setVelocityY(0);
        gameStatus.isDashing = true;
        dashDistance -= 1;
      }
    } else {
      gameStatus.isDashing = false;
      if (gameStatus.player.body.velocity.x < 0) {
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x + accelerationX);
        if (gameStatus.player.body.velocity.x > 0) {
          gameStatus.player.setVelocityX(0);
        }
      } else if (gameStatus.player.body.velocity.x > 0) {
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x - accelerationX);
        if (gameStatus.player.body.velocity.x < 0) {
          gameStatus.player.setVelocityX(0);
        }
      }
    }
    if (gameStatus.facing === 'left') {
      gameStatus.player.anims.play('idleleft', true);
    } else if (gameStatus.facing === 'right') {
      gameStatus.player.anims.play('idleright', true);
    }
  }

  if (keys.SPACE.isDown && gameStatus.player.body.touching.down) {
    gameStatus.player.setVelocityY(-1 * jumpVel);
  }

  if (keys.SPACE.isUp && !gameStatus.player.body.touching.down && gameStatus.player.body.velocity.y < (-1 * jumpVel / 2)) {
    gameStatus.player.setVelocityY(-1 * jumpVel / 2);
  }

  if (!gameStatus.player.body.touching.down) {
    if (gameStatus.facing === 'left')
      gameStatus.player.anims.play('jumpleft', true);
    else if (gameStatus.facing === 'right')
      gameStatus.player.anims.play('jumpright', true);
  }
}