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
let dashDistance;

function preload() {
  keys = this.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE');
  maxVelX = 200;
  accelerationX = 20;
  jumpVel = 600;
  dashDistance = 600;

  this.load.image('white', '../src/assets/white-square.png');
  this.load.image('top-tile', '../src/assets/grassy-red-sand-tile.png');
  this.load.image('tile', '../src/assets/red-sand-tile.png');
  this.load.image('goal', '../src/assets/goal-flag.png');
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
  if(gameStatus.finishLevel)
    levels.coverScene();
    else
    levels.uncoverScene();

  if(keys.A.isDown) {
    gameStatus.player.facing = 'left';
    if(keys.SHIFT.isDown){
      gameStatus.player.setVelocityX(-300);
      // Todo: add dash function, which will temporarily give a speed boost
      // and ignore gravity.
    } else {
      if(gameStatus.player.body.velocity.x < Math.abs(maxVelX)){
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x - accelerationX);
        if(gameStatus.player.body.velocity.x < -1 * maxVelX)
          gameStatus.player.setVelocityX(-1 * maxVelX);
      }
    }    
    gameStatus.player.anims.play('left', true);
  } else if (keys.D.isDown) {
    gameStatus.player.facing = 'right';
    if(keys.SHIFT.isDown){
      gameStatus.player.setVelocityX(300);
      // Todo: add dash function, which will temporarily give a speed boost
      // and ignore gravity.
    } else {
      if(gameStatus.player.body.velocity.x < Math.abs(maxVelX)){
        gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x + accelerationX);
        if(gameStatus.player.body.velocity.x > maxVelX)
          gameStatus.player.setVelocityX(maxVelX);
      }
    }  
    gameStatus.player.anims.play('right', true);
  } else {
    if(gameStatus.player.body.velocity.x < 0){
      gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x + accelerationX);
      if(gameStatus.player.body.velocity.x > 0){
        gameStatus.player.setVelocityX(0);
      }
    } else if(gameStatus.player.body.velocity.x > 0) {
      gameStatus.player.setVelocityX(gameStatus.player.body.velocity.x - accelerationX);
      if(gameStatus.player.body.velocity.x < 0){
        gameStatus.player.setVelocityX(0);
      }
    }
    if(gameStatus.player.facing === 'left') {
      gameStatus.player.anims.play('idleleft', true);
    } else if(gameStatus.player.facing === 'right') {
      gameStatus.player.anims.play('idleright', true);
    }
  }

  if(keys.SPACE.isDown && gameStatus.player.body.touching.down){
    gameStatus.player.setVelocityY(-1 * jumpVel);
  }

  if(keys.SPACE.isUp && !gameStatus.player.body.touching.down && gameStatus.player.body.velocity.y < (-1 * jumpVel/2)){
    gameStatus.player.setVelocityY(-1 * jumpVel/2);
  }

  if(!gameStatus.player.body.touching.down){
    if(gameStatus.player.facing === 'left')
      gameStatus.player.anims.play('jumpleft', true);
    else if(gameStatus.player.facing === 'right')
      gameStatus.player.anims.play('jumpright', true);
  }
}