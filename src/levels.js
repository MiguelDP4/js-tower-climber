import helpers from "./helpers";
import levelHelper from "./levelHelper.js";
import gameStatus from './statusModule';
export const levels = (() => {
  let levelScene;
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

  const finishLevel = (player, goal) => {
    goal.disableBody(true, true);
    if (gameStatus.level < 4) {
      gameStatus.level += 1;
    } else {
      gameStatus.level = 0;
    }

    gameStatus.facing = 'right';
    gameStatus.isDashing = false;
    gameStatus.goal.disableBody(true, true);
    gameStatus.player.disableBody(true, true);
    gameStatus.platforms.children.iterate(function(platform) {
      platform.disableBody(true, true);
    });
    gameStatus.curtain.destroy()
    gameStatus.finishLevel = false;
    console.log(gameStatus.platforms);
    load(gameStatus.level);
  };

  const setupGameObjects = (scene) => {
    gameStatus.player = scene.physics.add.sprite(0, 0, 'monty');
    gameStatus.player.setCollideWorldBounds(true);
    gameStatus.player.setScale(3);
    gameStatus.platforms = scene.physics.add.staticGroup();
    gameStatus.goal = scene.physics.add.sprite(0, 0, 'goal').setScale(2);
    gameStatus.curtain = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'white');
    gameStatus.curtain.setScale(64, 48);
    gameStatus.curtain.setDepth(100);
    scene.physics.add.collider(gameStatus.player, gameStatus.platforms);
    scene.physics.add.collider(gameStatus.goal, gameStatus.platforms);
    scene.physics.add.overlap(gameStatus.player, gameStatus.goal, finishLevel, null, scene);
    loadAnimations(scene);
  };

  const load = (levelNumber, scene = levelScene) => {
    levelScene = scene;
    setupGameObjects(scene);
    gameStatus.level = levelNumber;
    switch (levelNumber) {
      case 0:
        plain();
        break;
      case 1:
        level1();
        break;
      case 2:
        level2();
        break;
      case 3:
        level1();
        break;
      case 4:
        level1();
        break;
      default:

    }
  };

  const uncoverScene = () => {
    if (gameStatus.curtain.alpha > 0)
      gameStatus.curtain.alpha -= (0.01 + 0.01 * gameStatus.curtain.alpha);
    if (gameStatus.curtain.alpha < 0)
      gameStatus.curtain.alpha = 0;
  };

  const coverScene = () => {
    if (gameStatus.curtain.alpha < 1)
      gameStatus.curtain.alpha += gameStatus.curtain.alpha * 0.01 + 0.01;
    if (gameStatus.curtain.alpha > 1)
      gameStatus.curtain.alpha = 1;
  };

  const plain = () => {
    levelHelper.drawPlatformSquare(0, 0, 32, 0, 'top-tile');
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 2);
  };

  const level1 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 32, 0, 'top-tile');
    levelHelper.drawPlatformSquare(27, 2, 32, 0, 'tile');
    levelHelper.drawPlatformSquare(27, 3, 32, 3, 'top-tile');
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 4);
  };

  const level2 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 27, 0, 'top-tile');
    levelHelper.drawPlatformSquare(27,0,31,9, 'tile');
    levelHelper.drawPlatformSquare(27, 10, 31, 10, 'top-tile');
    levelHelper.drawPlatformSquare(20, 4, 23, 4, 'top-tile');
    levelHelper.drawPlatformSquare(15, 8, 17, 8, 'top-tile');
    levelHelper.drawPlatformSquare(20, 12, 23, 12, 'top-tile');
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 11);
  };

  return {
    load,
    uncoverScene,
    coverScene
  };
})();

export default levels;