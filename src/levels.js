import helpers from "./helpers";
import gameStatus from './statusModule';
export const levels = (() => {
  const loadAnimations = (scene) => {
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('monty', {
        start: 4,
        end: 5
      }),
      frameRate: 6,
      repeat: -1
    });
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('monty', {
        start: 0,
        end: 1
      }),
      frameRate: 6,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleleft',
      frames: [{
        key: 'monty',
        frame: 4
      }],
      frameRate: 20
    });
    scene.anims.create({
      key: 'idleright',
      frames: [{
        key: 'monty',
        frame: 0
      }],
      frameRate: 20
    });
    scene.anims.create({
      key: 'jumpleft',
      frames: [{
        key: 'monty',
        frame: 3
      }],
      frameRate: 20
    });
    scene.anims.create({
      key: 'jumpright',
      frames: [{
        key: 'monty',
        frame: 2
      }],
      frameRate: 20
    });
  };

  const setupGameObjects = (scene) => {
    gameStatus.clear();
    gameStatus.player = scene.physics.add.sprite(0,0,'monty');
    gameStatus.player.setCollideWorldBounds(true);
    gameStatus.player.setScale(3);
    gameStatus.platforms = scene.physics.add.staticGroup();
    gameStatus.goals = scene.physics.add.staticGroup();
    gameStatus.curtain = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'white');
    gameStatus.curtain.setScale(64,48);
    gameStatus.curtain.setDepth(100);
    scene.physics.add.collider(gameStatus.player, gameStatus.platforms);
    scene.physics.add.collider(gameStatus.player, gameStatus.goals);
    loadAnimations(scene);    
  };

  const load = (levelNumber, scene) => {
    setupGameObjects(scene);
      gameStatus.level = levelNumber;
      switch(levelNumber) {
        case 0:
        plain();
        break;
      case 1:
        level1();
        break;
      default:

    }
  };

  const uncoverScene = () => {
    if(gameStatus.curtain.alpha > 0)
      gameStatus.curtain.alpha -= (0.01 + 0.01 * gameStatus.curtain.alpha);
    if(gameStatus.curtain.alpha < 0)
      gameStatus.curtain.alpha = 0;
  };

  const coverScene = () => {
    if(gameStatus.curtain.alpha < 1)
      gameStatus.curtain.alpha += gameStatus.curtain.alpha * 0.01 + 0.01;
    if(gameStatus.curtain.alpha > 1)
      gameStatus.curtain.alpha = 1;
  };

  const plain = () => {
    for(let i = 0; i < 32; i+= 1){
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile').setScale(2).refreshBody();
    }
    gameStatus.player.x = 100;
    gameStatus.player.y = 500;
    gameStatus.goals.create(helpers.matrixPosX(30), helpers.matrixPosY(1), 'goal').setScale(2).refreshBody();
    
  };

  const level1 = (scene) => {
    for(let i = 0; i < 32; i+= 1){
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile').setScale(2).refreshBody();
    }
    gameStatus.player.x = 100;
    gameStatus.player.y = 500;
  };

  return { load, uncoverScene, coverScene };
})();

export default levels;