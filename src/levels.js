import {
  levelHelper,
} from './levelHelper';
import {
  gameStatus,
} from './statusModule';
import {
  APIcalls,
} from './APIcalls';

export const levels = (() => {
  let levelScene;
  const loadAnimations = (scene) => {
    scene.anims.create({
      key: 'gots-left',
      frames: [{
        key: 'gots',
        frame: 0,
      }],
      frameRate: 15,
    });
    scene.anims.create({
      key: 'gots-right',
      frames: [{
        key: 'gots-right',
        frame: 0,
      }],
      frameRate: 15,
    });
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('monty', {
        start: 4,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('monty', {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: 'idleleft',
      frames: [{
        key: 'monty',
        frame: 4,
      }],
      frameRate: 20,
    });
    scene.anims.create({
      key: 'idleright',
      frames: [{
        key: 'monty',
        frame: 0,
      }],
      frameRate: 20,
    });
    scene.anims.create({
      key: 'jumpleft',
      frames: [{
        key: 'monty',
        frame: 3,
      }],
      frameRate: 20,
    });
    scene.anims.create({
      key: 'jumpright',
      frames: [{
        key: 'monty',
        frame: 2,
      }],
      frameRate: 20,
    });
  };

  const loadScoreScreen = (scene) => {
    gameStatus.music.stop();
    gameStatus.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
    gameStatus.highScoreText = [];
    gameStatus.highScoreText[0] = scene.add.text(360, 24, 'HIGH SCORES', {
      fontSize: '48px',
      fill: '#000',
    });
    let allScores;
    APIcalls.getHighestScores().then((resolution) => {
      allScores = resolution.result;
      allScores.sort((a, b) => b.score - a.score);
      for (let i = 1; i < 7; i += 1) {
        gameStatus.highScoreText[i] = scene.add.text(48, i * 90 + 48, `${i} - ${allScores[i - 1].user} [Score: ${allScores[i - 1].score}]`, {
          fontSize: '48px',
          fill: '#000',
        });
      }
      gameStatus.highScoreText[7] = scene.add.text(48, 678, 'Press <ENTER> to return to the title screen', {
        fontSize: '36px',
        fill: '#000',
      });
    });
  };

  const clearGameObjects = () => {
    gameStatus.goal.disableBody(true, true);
    gameStatus.livesText.destroy();
    gameStatus.facing = 'right';
    gameStatus.isDashing = false;
    gameStatus.goal.disableBody(true, true);
    gameStatus.player.disableBody(true, true);
    gameStatus.enemies.children.iterate((enemy) => {
      enemy.disableBody(true, true);
    });
    gameStatus.platforms.children.iterate((platform) => {
      platform.disableBody(true, true);
    });
    gameStatus.spines.children.iterate((spine) => {
      spine.disableBody(true, true);
    });
    gameStatus.curtain.destroy();
    while (gameStatus.playerDashShadow.getFirstAlive() != null) {
      gameStatus.playerDashShadow.killAndHide(gameStatus.playerDashShadow.getFirstAlive());
    }
    gameStatus.finishLevel = false;
  };

  const uncoverScene = () => {
    if (gameStatus.curtain.alpha > 0) {
      gameStatus.curtain.alpha -= (0.01 + 0.01 * gameStatus.curtain.alpha);
    }
    if (gameStatus.curtain.alpha < 0) {
      gameStatus.curtain.alpha = 0;
    }
  };

  const coverScene = () => {
    if (gameStatus.curtain.alpha < 1) {
      gameStatus.curtain.alpha += gameStatus.curtain.alpha * 0.01 + 0.01;
    }
    if (gameStatus.curtain.alpha > 1) {
      gameStatus.curtain.alpha = 1;
    }
  };

  const tutorial = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }
    levelHelper.drawPlatformSquare(0, 0, 31, 0, 'top-tile');
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(30, 3);
  };

  const level1 = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }
    levelHelper.drawPlatformSquare(0, 0, 32, 0, 'top-tile');
    levelHelper.drawPlatformSquare(27, 2, 32, 0, 'tile');
    levelHelper.drawPlatformSquare(27, 3, 32, 3, 'top-tile');
    levelHelper.placePlayer(3, 5);
    levelHelper.placeGoal(30, 4);
  };

  const level2 = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }
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

  const level3 = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }

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

  const level4 = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }
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

  const level5 = () => {
    let enemyAmount = 0;
    if (gameStatus.cycles <= 7) {
      enemyAmount = gameStatus.cycles;
    } else {
      enemyAmount = 8;
    }
    for (let i = 1; i <= enemyAmount; i += 1) {
      const enemy = levelHelper.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x *= (gameStatus.cycles / 4);
        enemy.velocity.y *= (gameStatus.cycles / 4);
      }
    }
    levelHelper.drawPlatformSquare(0, 0, 6, 0, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(7, 31, 0);
    levelHelper.drawPlatformSquare(10, 8, 10, 15, 'tile');
    levelHelper.drawPlatformSquare(10, 16, 10, 16, 'top-tile');
    levelHelper.drawPlatformSquare(14, 8, 14, 16, 'tile');
    levelHelper.drawPlatformSquare(15, 8, 31, 16, 'tile');
    levelHelper.drawPlatformSquare(14, 17, 14, 17, 'top-tile');
    levelHelper.drawPlatformSquare(0, 16, 0, 16, 'top-tile');
    levelHelper.drawPlatformSquare(0, 0, 0, 15, 'tile');
    levelHelper.drawPlatformSquare(1, 4, 1, 4, 'top-tile');
    levelHelper.drawPlatformSquare(9, 8, 9, 8, 'top-tile');
    levelHelper.drawPlatformSquare(1, 12, 1, 12, 'top-tile');
    levelHelper.drawPlatformSquare(9, 16, 9, 16, 'top-tile');
    levelHelper.drawSpineHorizontalLineFacingUp(15, 31, 17);
    levelHelper.drawPlatformSquare(15, 16, 31, 16, 'tile');
    levelHelper.placePlayer(1, 2);
    levelHelper.placeGoal(20, 3);
  };

  const load = (levelNumber, scene = levelScene) => {
    levelScene = scene;
    gameStatus.level = levelNumber;
    setupGameObjects(scene); //eslint-disable-line
    switch (levelNumber) {
      case 0:
        tutorial();
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
      default:
        gameStatus.level = -1;
        break;
    }
  };

  const setupGameObjects = (scene) => {
    if (gameStatus.level === -3) {
      gameStatus.music.stop();
      const body = document.getElementsByTagName('body')[0];
      gameStatus.playerNameInput = document.createElement('input');
      gameStatus.inputButton = document.createElement('button');
      gameStatus.inputButton.addEventListener('click', () => {
        if (gameStatus.playerNameInput.value === '') {
          APIcalls.saveScore('Anonymous', gameStatus.score);
        } else {
          APIcalls.saveScore(gameStatus.playerNameInput.value, gameStatus.score);
        }
        gameStatus.score = 0;
        gameStatus.playerNameInput.parentNode.removeChild(gameStatus.playerNameInput);
        gameStatus.inputButton.parentNode.removeChild(gameStatus.inputButton);
        gameStatus.level = -2;
        loadScoreScreen(scene);
      });
      gameStatus.inputButton.style.position = 'absolute';
      gameStatus.inputButton.style.height = `${body.clientHeight * 0.05}px`;
      const buttonPositionY = body.clientHeight / 2 - parseFloat(gameStatus.inputButton.style.height
        .substring(0, gameStatus.inputButton.style.height.length - 2) / 2);
      gameStatus.inputButton.style.top = `${buttonPositionY}px`;
      gameStatus.inputButton.style.width = `${body.clientWidth * 0.15}px`;
      const buttonPositionX = body.clientWidth / 2 - parseFloat(gameStatus.inputButton.style.width
        .substring(0, gameStatus.inputButton.style.width.length - 2) / 2);
      gameStatus.inputButton.style.left = `${buttonPositionX}px`;
      gameStatus.inputButton.innerHTML = 'Save my Score';

      gameStatus.playerNameInput.style.position = 'absolute';
      gameStatus.playerNameInput.style.height = `${body.clientHeight * 0.05}px`;
      const inputPositionY = body.clientHeight / 2
        - parseFloat(gameStatus.playerNameInput.style.height
          .substring(0, gameStatus.playerNameInput.style.height.length - 2) / 2);
      gameStatus.playerNameInput.style.top = `${inputPositionY - body.clientHeight * 0.07}px`;
      gameStatus.playerNameInput.style.width = `${body.clientWidth * 0.15}px`;
      const inputPositionX = body.clientWidth / 2
        - parseFloat(gameStatus.playerNameInput.style.width
          .substring(0, gameStatus.playerNameInput.style.width.length - 2) / 2);
      gameStatus.playerNameInput.style.left = `${inputPositionX}px`;
      gameStatus.playerNameInput.placeholder = 'Enter your name';

      body.append(gameStatus.playerNameInput);
      body.append(gameStatus.inputButton);
    } else if (gameStatus.level === -2) {
      loadScoreScreen(scene);
    } else if (gameStatus.level === -1) {
      gameStatus.music.stop();
      gameStatus.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
      gameStatus.titleScreen = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'title');
    } else {
      if (!gameStatus.music.isPlaying) {
        gameStatus.music.play();
      }
      gameStatus.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
      gameStatus.livesText = scene.add.text(24, 24, `Lives: ${gameStatus.lives}`, {
        fontSize: '32px',
        fill: '#000',
      });
      gameStatus.player = scene.physics.add.sprite(0, 0, 'monty');
      gameStatus.player.setCollideWorldBounds(true);
      gameStatus.player.setScale(3);
      gameStatus.playerDashShadow = scene.add.group();
      gameStatus.platforms = scene.physics.add.staticGroup();
      gameStatus.spines = scene.physics.add.staticGroup();
      gameStatus.goal = scene.physics.add.sprite(0, 0, 'goal').setScale(2);
      gameStatus.enemies = scene.physics.add.group({
        allowGravity: false,
      });
      gameStatus.curtain = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'white');
      gameStatus.curtain.setScale(64, 48);
      gameStatus.curtain.setDepth(100);
      scene.physics.add.collider(gameStatus.goal, gameStatus.spines);
      scene.physics.add.collider(gameStatus.enemies, gameStatus.platforms);
      scene.physics.add.overlap(gameStatus.player, gameStatus.enemies, () => {
        if (gameStatus.lives > 0) {
          gameStatus.lives -= 1;
        } else {
          gameStatus.score = gameStatus.level + gameStatus.cycles * 5;
          gameStatus.level = -3;
          gameStatus.lives = 4;
          gameStatus.cycles = 0;
        }
        gameStatus.livesText.setText(`Lives: ${gameStatus.lives}`);
        clearGameObjects();
        load(gameStatus.level);
      }, null, scene);
      scene.physics.add.collider(gameStatus.player, gameStatus.platforms);
      scene.physics.add.collider(gameStatus.goal, gameStatus.platforms);
      scene.physics.add.overlap(gameStatus.player, gameStatus.goal, () => {
        if (gameStatus.level < 5) {
          gameStatus.level += 1;
        } else {
          gameStatus.level = 1;
          gameStatus.cycles += 1;
        }
        clearGameObjects();
        load(gameStatus.level);
      }, null, scene);
      scene.physics.add.overlap(gameStatus.player, gameStatus.spines, () => {
        if (gameStatus.lives > 0) {
          gameStatus.lives -= 1;
        } else {
          gameStatus.score = gameStatus.level + gameStatus.cycles * 5;
          gameStatus.level = -3;
          gameStatus.lives = 4;
          gameStatus.cycles = 0;
        }
        gameStatus.livesText.setText(`Lives: ${gameStatus.lives}`);
        clearGameObjects();
        load(gameStatus.level);
      }, null, scene);
      loadAnimations(scene);
    }
  };

  return {
    load,
    uncoverScene,
    coverScene,
  };
})();

export default levels;