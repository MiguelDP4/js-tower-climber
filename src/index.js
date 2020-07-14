import Phaser from "phaser";
import levels from "./levels";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 608,
  pixelArt: true,
  backgroundColor: '#9bd4e8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 600
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


function preload() {
  this.load.image('top-tile', '../src/assets/grassy-red-sand-tile.png');
  this.load.image('tile', '../src/assets/grassy-red-sand-tile.png');
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

}