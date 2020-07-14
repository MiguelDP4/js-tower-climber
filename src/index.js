import Phaser from "phaser";
import helpers from "./helpers";

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

let player;
let platforms;

function create() {
  player = this.physics.add.sprite(100,450,'monty');
  platforms = this.physics.add.staticGroup();
  for(let i = 0; i <= 50; i+= 1){
    platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile');
  }
  this.physics.add.collider(player, platforms);
  player.setCollideWorldBounds(true);
  player.setScale(2);
}

function update() {

}