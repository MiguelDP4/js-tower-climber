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
    for (let i = 0; i < 32; i += 1) {
      levelHelper.placePlatformTile('top-tile', i, 0)
    }
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 2)

  };

  const level1 = (scene) => {
    for (let i = 0; i < 27; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile').setScale(2).refreshBody();
    }
    levelHelper.drawPlatformSquare(27, 2, 32, 0, 'tile');
    levelHelper.drawPlatformSquare(27, 3, 32, 3, 'top-tile');
    gameStatus.goal.x = helpers.matrixPosX(30);
    gameStatus.goal.y = helpers.matrixPosY(4);
    gameStatus.player.x = 100;
    gameStatus.player.y = 500;
  };

  const level2 = (scene) => {
    for (let i = 0; i < 27; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(1), 'tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(2), 'tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(3), 'tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(4), 'tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(5), 'tile').setScale(2).refreshBody();
    }
    for (let i = 20; i < 25; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(3), 'top-tile').setScale(2).refreshBody();
    }
    for (let i = 27; i < 32; i += 1) {
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(6), 'top-tile').setScale(2).refreshBody();
    }
    gameStatus.goal.x = helpers.matrixPosX(30);
    gameStatus.goal.y = helpers.matrixPosY(7);
    gameStatus.player.x = 100;
    gameStatus.player.y = 500;
  };

  return {
    load,
    uncoverScene,
    coverScene
  };
})();

export default levels;