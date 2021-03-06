import Phaser from 'phaser';
import { levels } from './levels';
import { gameStatus } from './statusModule';

let maxVelX;
let accelerationX;
let jumpVel;
let maxDashDistance;
let dashDistance;
let shadowKillTimer;

function preload() {
  maxVelX = 200;
  accelerationX = 20;
  jumpVel = 600;
  maxDashDistance = 15;
  dashDistance = maxDashDistance;
  shadowKillTimer = 6;

  this.load.image('title', '../assets/TitleScreen.png');
  this.load.image('gots-right', '../assets/gots-right.png');
  this.load.image('gots', '../assets/gots.png');
  this.load.image('white', '../assets/white-square.png');
  this.load.image('spinesup', '../assets/spinesup.png');
  this.load.image('spinesdown', '../assets/spinesdown.png');
  this.load.image('spinesleft', '../assets/spinesleft.png');
  this.load.image('spinesright', '../assets/spinesright.png');
  this.load.image('top-tile', '../assets/grassy-red-sand-tile.png');
  this.load.image('tile', '../assets/red-sand-tile.png');
  this.load.image('goal', '../assets/goal-flag.png');
  this.load.image('montyjumpleft', '../assets/monty-jump-left.png');
  this.load.image('montyjumpright', '../assets/monty-jump-right.png');
  this.load.spritesheet('monty',
    '../assets/Monty.png', {
      frameWidth: 8,
      frameHeight: 16,
    });
  this.load.audio('music', '../assets/Ehrling-Adventure-Sax Education-Typhoon.mp3');
}

function create() {
  gameStatus.music = this.sound.add('music');
  levels.load(-1, this);
}

function update() {
  if (gameStatus.level === -3) {
    this.input.keyboard.enabled = false;
  } else if (gameStatus.level === -2) {
    this.input.keyboard.enabled = true;
    if (gameStatus.keys.ENTER.isDown) {
      gameStatus.level += 1;
      for (let i = 0; i < 8; i += 1) {
        gameStatus.highScoreText[i].destroy();
      }
      levels.load(gameStatus.level);
    }
  } else if (gameStatus.level === -1) {
    this.input.keyboard.enabled = true;
    if (gameStatus.keys.SPACE.isDown) {
      gameStatus.level += 1;
      gameStatus.titleScreen.destroy();
      levels.load(gameStatus.level);
    } else if (gameStatus.keys.SHIFT.isDown) {
      gameStatus.level = -2;
      gameStatus.titleScreen.destroy();
      levels.load(gameStatus.level);
    }
  } else {
    this.input.keyboard.enabled = true;
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
      gameStatus.player.setScale(3);
    }

    if (gameStatus.keys.SHIFT.isUp && gameStatus.player.body.touching.down) {
      dashDistance = maxDashDistance;
    }

    if (gameStatus.keys.A.isDown) {
      gameStatus.facing = 'left';
      if (gameStatus.keys.SHIFT.isDown && dashDistance > 0) {
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
        if (gameStatus.player.body.velocity.x < -1 * maxVelX) {
          gameStatus.player.setVelocityX(-1 * maxVelX);
        }
      }
      gameStatus.player.anims.play('left', true);
    } else if (gameStatus.keys.D.isDown) {
      gameStatus.facing = 'right';
      if (gameStatus.keys.SHIFT.isDown && dashDistance > 0) {
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
        if (gameStatus.player.body.velocity.x > maxVelX) gameStatus.player.setVelocityX(maxVelX);
      }
      gameStatus.player.anims.play('right', true);
    } else {
      if (gameStatus.keys.SHIFT.isDown && dashDistance > 0) {
        if (gameStatus.facing === 'right') {
          if (dashDistance % 3 === 0) {
            gameStatus.playerDashShadow.create(gameStatus.player.x, gameStatus.player.y, 'montyjumpright').setScale(4, 2.7);
          }

          gameStatus.player.setVelocityX(maxVelX * 2.5);
          gameStatus.player.setVelocityY(0);
          gameStatus.isDashing = true;
          dashDistance -= 1;
        } else {
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

    if (gameStatus.keys.SPACE.isDown && gameStatus.player.body.touching.down) {
      gameStatus.player.setVelocityY(-1 * jumpVel);
    }

    if (gameStatus.keys.SPACE.isUp
      && !gameStatus.player.body.touching.down
      && gameStatus.player.body.velocity.y < (-1 * (jumpVel / 2))) {
      gameStatus.player.setVelocityY(-1 * (jumpVel / 2));
    }

    if (!gameStatus.player.body.touching.down) {
      if (gameStatus.facing === 'left') gameStatus.player.anims.play('jumpleft', true);
      else if (gameStatus.facing === 'right') gameStatus.player.anims.play('jumpright', true);
    }
    gameStatus.enemies.children.iterate((enemy) => {
      if (enemy.body.velocity.x >= 0) {
        enemy.anims.play('gots-right');
      } else {
        enemy.anims.play('gots-left');
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1024,
  height: 768,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  backgroundColor: '#9bd4e8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1200,
      },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
