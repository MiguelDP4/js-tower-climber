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
let velX;
let jumpVel;

function preload() {
  keys = this.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE');
  velX = 200;
  jumpVel = 600;
  this.load.image('white', '../src/assets/white-square.png');
  this.load.image('top-tile', '../src/assets/grassy-red-sand-tile.png');
  this.load.image('tile', '../src/assets/grassy-red-sand-tile.png');
  this.load.image('goal', '../src/assets/goal-flag.png');
  this.load.spritesheet('monty',
   '../src/assets/Monty.png', {
    frameWidth: 16,
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
      gameStatus.player.setVelocityX(-1 * velX);
    }    
    gameStatus.player.anims.play('left', true);
  } else if (keys.D.isDown) {
    gameStatus.player.facing = 'right';
    if(keys.SHIFT.isDown){
      gameStatus.player.setVelocityX(300);
      // Todo: add dash function, which will temporarily give a speed boost
      // and ignore gravity.
    } else {
      gameStatus.player.setVelocityX(velX);
    }  
    gameStatus.player.anims.play('right', true);
  } else {
    if(gameStatus.player.facing === 'left') {
      gameStatus.player.anims.play('idleleft', true);
    } else if(gameStatus.player.facing === 'right') {
      gameStatus.player.anims.play('idleright', true);
    }
    gameStatus.player.setVelocityX(0);
  }

  if(keys.SPACE.isDown && gameStatus.player.body.touching.down){
    gameStatus.player.setVelocityY(-1 * jumpVel);
  }

  if(!gameStatus.player.body.touching.down){
    if(gameStatus.player.facing === 'left')
      gameStatus.player.anims.play('jumpleft', true);
    else if(gameStatus.player.facing === 'right')
      gameStatus.player.anims.play('jumpright', true);
  }
}