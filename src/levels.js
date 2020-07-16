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

  const clearGameObjects = () => {
    gameStatus.goal.disableBody(true, true);
    if (gameStatus.level < 4) {
      gameStatus.level += 1;
    } else {
      gameStatus.level = 1;
    }

    gameStatus.facing = 'right';
    gameStatus.isDashing = false;
    gameStatus.goal.disableBody(true, true);
    gameStatus.player.disableBody(true, true);
    gameStatus.platforms.children.iterate(function (platform) {
      platform.disableBody(true, true);
    });
    gameStatus.spines.children.iterate(function (spine) {
      spine.disableBody(true, true);
    });
    gameStatus.curtain.destroy()
    while (gameStatus.playerDashShadow.getFirstAlive() != null) {
      gameStatus.playerDashShadow.killAndHide(gameStatus.playerDashShadow.getFirstAlive());
    }
    gameStatus.finishLevel = false;
  };

  const winLevel = () => {
    clearGameObjects();
    load(gameStatus.level);
  };

  const setupGameObjects = (scene) => {
    gameStatus.player = scene.physics.add.sprite(0, 0, 'monty');
    gameStatus.player.setCollideWorldBounds(true);
    gameStatus.player.setScale(3);
    gameStatus.playerDashShadow = scene.add.group();
    gameStatus.platforms = scene.physics.add.staticGroup();
    gameStatus.spines = scene.physics.add.staticGroup();
    gameStatus.goal = scene.physics.add.sprite(0, 0, 'goal').setScale(2);
    gameStatus.curtain = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'white');
    gameStatus.curtain.setScale(64, 48);
    gameStatus.curtain.setDepth(100);
    scene.physics.add.collider(gameStatus.player, gameStatus.spines);
    scene.physics.add.collider(gameStatus.player, gameStatus.platforms);
    scene.physics.add.collider(gameStatus.goal, gameStatus.platforms);
    scene.physics.add.overlap(gameStatus.player, gameStatus.goal, winLevel, null, scene);
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
        level3();
        break;
      case 4:
        level4();
        break;
      case 5:
        level5();
        break;
      case 6:
        level6();
        break;
      case 7:
        level7();
        break;
      case 8:
        level8();
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
    levelHelper.drawPlatformSquare(0, 0, 31, 0, 'top-tile');
    levelHelper.drawSpineVerticalLineFacingRight(1, 23, 0);
    levelHelper.drawSpineVerticalLineFacingLeft(1, 18, 6);
    levelHelper.drawPlatformSquare(7, 0, 12, 18, 'tile');
    levelHelper.drawPlatformSquare(5, 19, 12, 19, 'top-tile');
    levelHelper.drawPlatformSquare(5, 4, 6, 4, 'top-tile');
    levelHelper.drawPlatformSquare(0, 8, 1, 8, 'top-tile');
    levelHelper.drawPlatformSquare(5, 12, 6, 12, 'top-tile');
    levelHelper.drawPlatformSquare(0, 16, 1, 16, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(13, 18, 1);
    levelHelper.drawPlatformSquare(19, 12, 27, 18, 'tile');
    levelHelper.drawPlatformSquare(19, 9, 20, 11, 'tile');
    levelHelper.drawPlatformSquare(19, 0, 27, 8, 'tile');
    levelHelper.drawPlatformSquare(19, 19, 27, 19, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(28, 31, 1);
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(21, 10);
  };

  const level1 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 32, 0, 'top-tile');
    levelHelper.drawPlatformSquare(27, 2, 32, 0, 'tile');
    levelHelper.drawPlatformSquare(27, 3, 32, 3, 'top-tile');
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 4);
  };

  const level2 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 12, 0, 'top-tile');
    levelHelper.drawPlatformSquare(18, 0, 31, 0, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(13, 17, 0);
    levelHelper.drawPlatformSquare(18, 0, 25, 0, 'top-tile');
    levelHelper.drawPlatformSquare(26, 0, 31, 6, 'tile');
    levelHelper.drawPlatformSquare(26, 7, 31, 7, 'top-tile');
    levelHelper.drawPlatformSquare(16, 6, 17, 6, 'top-tile');
    levelHelper.drawPlatformSquare(20, 2, 22, 2, 'top-tile');
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(30, 8);
  };

  const level3 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 25, 0, 'top-tile');
    levelHelper.drawPlatformSquare(15, 16, 28, 16, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingDown(15, 28, 15);
    levelHelper.drawPlatformSquare(11, 8, 14, 8, 'tile');
    levelHelper.drawPlatformSquare(13, 9, 14, 9, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(11, 12, 9);
    levelHelper.drawPlatformSquare(10, 9, 10, 9, 'top-tile');
    levelHelper.drawPlatformSquare(10, 8, 10, 8, 'tile');
    levelHelper.drawPlatformSquare(5, 10, 7, 12, 'tile');
    levelHelper.drawPlatformSquare(5, 13, 7, 13, 'top-tile');
    levelHelper.drawPlatformSquare(18, 0, 25, 0, 'top-tile');
    levelHelper.drawPlatformSquare(26, 7, 26, 15, 'tile');
    levelHelper.drawPlatformSquare(26, 0, 31, 6, 'tile');
    levelHelper.drawPlatformSquare(27, 7, 31, 7, 'top-tile');
    levelHelper.drawPlatformSquare(16, 5, 17, 5, 'top-tile');
    levelHelper.drawPlatformSquare(20, 2, 22, 2, 'top-tile');
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(30, 8);
  };

  const level4 = (scene) => {
    levelHelper.drawPlatformSquare(0, 0, 31, 0, 'top-tile');
    levelHelper.drawSpineVerticalLineFacingRight(1, 23, 0);
    levelHelper.drawSpineVerticalLineFacingLeft(1, 18, 6);
    levelHelper.drawPlatformSquare(7, 0, 12, 18, 'tile');
    levelHelper.drawPlatformSquare(5, 19, 12, 19, 'top-tile');
    levelHelper.drawPlatformSquare(5, 4, 6, 4, 'top-tile');
    levelHelper.drawPlatformSquare(0, 8, 1, 8, 'top-tile');
    levelHelper.drawPlatformSquare(5, 12, 6, 12, 'top-tile');
    levelHelper.drawPlatformSquare(0, 16, 1, 16, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(13, 18, 1);
    levelHelper.drawPlatformSquare(19, 12, 27, 18, 'tile');
    levelHelper.drawPlatformSquare(19, 9, 20, 11, 'tile');
    levelHelper.drawPlatformSquare(19, 0, 27, 8, 'tile');
    levelHelper.drawPlatformSquare(19, 19, 27, 19, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(28, 31, 1);
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(21, 10);
  };
  return {
    load,
    uncoverScene,
    coverScene
  };
})();

export default levels;