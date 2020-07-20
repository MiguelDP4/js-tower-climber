webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameStatus = exports.gameStatus = function () {
  var titleScreen = void 0;
  var player = void 0;
  var platforms = void 0;
  var enemies = void 0;
  var goal = void 0;
  var playerNameInput = void 0;
  var inputButton = void 0;
  var level = void 0;
  var lives = 4;
  var cycles = 0;
  var highScoreScreen = void 0;
  var highScoreText = void 0;
  var livesText = void 0;
  var dashDistance = void 0;
  var isDashing = false;
  var playerDashShadow = void 0;
  var facing = 'right';
  var curtain = void 0;
  var spines = void 0;
  var finishLevel = false;
  var keys = void 0;
  var score = void 0;
  var music = void 0;

  return {
    titleScreen: titleScreen,
    highScoreScreen: highScoreScreen,
    highScoreText: highScoreText,
    level: level,
    lives: lives,
    livesText: livesText,
    cycles: cycles,
    platforms: platforms,
    enemies: enemies,
    player: player,
    isDashing: isDashing,
    playerDashShadow: playerDashShadow,
    dashDistance: dashDistance,
    facing: facing,
    goal: goal,
    curtain: curtain,
    spines: spines,
    finishLevel: finishLevel,
    playerNameInput: playerNameInput,
    inputButton: inputButton,
    keys: keys,
    score: score,
    music: music
  };
}();

exports.default = gameStatus;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _levels = __webpack_require__(3);

var _levels2 = _interopRequireDefault(_levels);

var _statusModule = __webpack_require__(0);

var _statusModule2 = _interopRequireDefault(_statusModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  type: _phaser2.default.AUTO,
  parent: 'phaser-example',
  width: 1024,
  height: 768,
  scale: {
    mode: _phaser2.default.Scale.FIT,
    autoCenter: _phaser2.default.Scale.CENTER_BOTH
  },
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

var game = new _phaser2.default.Game(config);
var maxVelX = void 0;
var accelerationX = void 0;
var jumpVel = void 0;
var maxDashDistance = void 0;
var dashDistance = void 0;
var shadowKillTimer = void 0;

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
  this.load.spritesheet('monty', '../assets/Monty.png', {
    frameWidth: 8,
    frameHeight: 16
  });
  this.load.audio('music', '../assets/Ehrling-Adventure-Sax Education-Typhoon.mp3');
}

function create() {
  _statusModule2.default.music = this.sound.add('music');
  _levels2.default.load(-1, this);
}

function update() {
  if (_statusModule2.default.level === -3) {
    this.input.keyboard.enabled = false;
  } else if (_statusModule2.default.level === -2) {
    this.input.keyboard.enabled = true;
    if (_statusModule2.default.keys.ENTER.isDown) {
      _statusModule2.default.level += 1;
      for (var i = 0; i < 8; i += 1) {
        _statusModule2.default.highScoreText[i].destroy();
      }
      _levels2.default.load(_statusModule2.default.level);
    }
  } else if (_statusModule2.default.level === -1) {
    this.input.keyboard.enabled = true;
    if (_statusModule2.default.keys.SPACE.isDown) {
      _statusModule2.default.level += 1;
      _statusModule2.default.titleScreen.destroy();
      _levels2.default.load(_statusModule2.default.level);
    } else if (_statusModule2.default.keys.SHIFT.isDown) {
      _statusModule2.default.level = -2;
      _statusModule2.default.titleScreen.destroy();
      _levels2.default.load(_statusModule2.default.level);
    }
  } else {
    this.input.keyboard.enabled = true;
    if (shadowKillTimer > 0) {
      shadowKillTimer -= 1;
    } else {
      shadowKillTimer = 6;
      _statusModule2.default.playerDashShadow.killAndHide(_statusModule2.default.playerDashShadow.getFirstAlive());
    }
    if (_statusModule2.default.finishLevel) {
      _levels2.default.coverScene();
    } else {
      _levels2.default.uncoverScene();
    }

    if (_statusModule2.default.isDashing) {
      _statusModule2.default.player.setScale(4, 2.7);
    } else {
      _statusModule2.default.player.setScale(3);
    }

    if (_statusModule2.default.keys.SHIFT.isUp && _statusModule2.default.player.body.touching.down) {
      dashDistance = maxDashDistance;
    }

    if (_statusModule2.default.keys.A.isDown) {
      _statusModule2.default.facing = 'left';
      if (_statusModule2.default.keys.SHIFT.isDown && dashDistance > 0) {
        if (dashDistance % 3 === 0) {
          _statusModule2.default.playerDashShadow.create(_statusModule2.default.player.x, _statusModule2.default.player.y, 'montyjumpleft').setScale(4, 2.7);
        }
        _statusModule2.default.player.setVelocityX(-maxVelX * 2.5);
        _statusModule2.default.player.setVelocityY(0);
        _statusModule2.default.isDashing = true;
        dashDistance -= 1;
        if (_statusModule2.default.facing === 'left') {
          _statusModule2.default.player.anims.play('jumpleft', true);
        } else if (_statusModule2.default.facing === 'right') {
          _statusModule2.default.player.anims.play('jumpright', true);
        }
      } else {
        _statusModule2.default.isDashing = false;
        if (_statusModule2.default.player.body.velocity.x < Math.abs(maxVelX)) {
          _statusModule2.default.player.setVelocityX(_statusModule2.default.player.body.velocity.x - accelerationX);
        }
        if (_statusModule2.default.player.body.velocity.x < -1 * maxVelX) _statusModule2.default.player.setVelocityX(-1 * maxVelX);
      }
      _statusModule2.default.player.anims.play('left', true);
    } else if (_statusModule2.default.keys.D.isDown) {
      _statusModule2.default.facing = 'right';
      if (_statusModule2.default.keys.SHIFT.isDown && dashDistance > 0) {
        if (dashDistance % 3 === 0) {
          _statusModule2.default.playerDashShadow.create(_statusModule2.default.player.x, _statusModule2.default.player.y, 'montyjumpright').setScale(4, 2.7);
        }

        _statusModule2.default.player.setVelocityX(maxVelX * 2.5);
        _statusModule2.default.player.setVelocityY(0);
        _statusModule2.default.isDashing = true;
        dashDistance -= 1;
      } else {
        _statusModule2.default.isDashing = false;
        if (_statusModule2.default.player.body.velocity.x < maxVelX) {
          _statusModule2.default.player.setVelocityX(_statusModule2.default.player.body.velocity.x + accelerationX);
        }
        if (_statusModule2.default.player.body.velocity.x > maxVelX) _statusModule2.default.player.setVelocityX(maxVelX);
      }
      _statusModule2.default.player.anims.play('right', true);
    } else {
      if (_statusModule2.default.keys.SHIFT.isDown && dashDistance > 0) {
        if (_statusModule2.default.facing == 'right') {
          if (dashDistance % 3 === 0) {
            _statusModule2.default.playerDashShadow.create(_statusModule2.default.player.x, _statusModule2.default.player.y, 'montyjumpright').setScale(4, 2.7);
          }

          _statusModule2.default.player.setVelocityX(maxVelX * 2.5);
          _statusModule2.default.player.setVelocityY(0);
          _statusModule2.default.isDashing = true;
          dashDistance -= 1;
        } else {
          if (dashDistance % 3 === 0) {
            _statusModule2.default.playerDashShadow.create(_statusModule2.default.player.x, _statusModule2.default.player.y, 'montyjumpleft').setScale(4, 2.7);
          }

          _statusModule2.default.player.setVelocityX(maxVelX * 2.5 * -1);
          _statusModule2.default.player.setVelocityY(0);
          _statusModule2.default.isDashing = true;
          dashDistance -= 1;
        }
      } else {
        _statusModule2.default.isDashing = false;
        if (_statusModule2.default.player.body.velocity.x < 0) {
          _statusModule2.default.player.setVelocityX(_statusModule2.default.player.body.velocity.x + accelerationX);
          if (_statusModule2.default.player.body.velocity.x > 0) {
            _statusModule2.default.player.setVelocityX(0);
          }
        } else if (_statusModule2.default.player.body.velocity.x > 0) {
          _statusModule2.default.player.setVelocityX(_statusModule2.default.player.body.velocity.x - accelerationX);
          if (_statusModule2.default.player.body.velocity.x < 0) {
            _statusModule2.default.player.setVelocityX(0);
          }
        }
      }
      if (_statusModule2.default.facing === 'left') {
        _statusModule2.default.player.anims.play('idleleft', true);
      } else if (_statusModule2.default.facing === 'right') {
        _statusModule2.default.player.anims.play('idleright', true);
      }
    }

    if (_statusModule2.default.keys.SPACE.isDown && _statusModule2.default.player.body.touching.down) {
      _statusModule2.default.player.setVelocityY(-1 * jumpVel);
    }

    if (_statusModule2.default.keys.SPACE.isUp && !_statusModule2.default.player.body.touching.down && _statusModule2.default.player.body.velocity.y < -1 * jumpVel / 2) {
      _statusModule2.default.player.setVelocityY(-1 * jumpVel / 2);
    }

    if (!_statusModule2.default.player.body.touching.down) {
      if (_statusModule2.default.facing === 'left') _statusModule2.default.player.anims.play('jumpleft', true);else if (_statusModule2.default.facing === 'right') _statusModule2.default.player.anims.play('jumpright', true);
    }
    _statusModule2.default.enemies.children.iterate(function (enemy) {
      if (enemy.body.velocity.x >= 0) {
        enemy.anims.play('gots-right');
      } else {
        enemy.anims.play('gots-left');
      }
    });
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = undefined;

var _levelHelper = __webpack_require__(4);

var _levelHelper2 = _interopRequireDefault(_levelHelper);

var _statusModule = __webpack_require__(0);

var _statusModule2 = _interopRequireDefault(_statusModule);

var _APIcalls = __webpack_require__(6);

var _APIcalls2 = _interopRequireDefault(_APIcalls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levels = exports.levels = function () {
  var levelScene = void 0;
  var loadAnimations = function loadAnimations(scene) {
    scene.anims.create({
      key: 'gots-left',
      frames: [{
        key: 'gots',
        frame: 0
      }],
      frameRate: 15
    });
    scene.anims.create({
      key: 'gots-right',
      frames: [{
        key: 'gots-right',
        frame: 0
      }],
      frameRate: 15
    });
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

  var setupGameObjects = function setupGameObjects(scene) {
    if (_statusModule2.default.level === -3) {
      _statusModule2.default.music.stop();
      var body = document.getElementsByTagName("body")[0];
      _statusModule2.default.playerNameInput = document.createElement("input");
      _statusModule2.default.inputButton = document.createElement("button");
      _statusModule2.default.inputButton.addEventListener("click", function () {
        if (_statusModule2.default.playerNameInput.value == "") {
          _APIcalls2.default.saveScore("Anonymous", _statusModule2.default.score);
        } else {
          _APIcalls2.default.saveScore(_statusModule2.default.playerNameInput.value, _statusModule2.default.score);
        }
        _statusModule2.default.score = 0;
        _statusModule2.default.playerNameInput.parentNode.removeChild(_statusModule2.default.playerNameInput);
        _statusModule2.default.inputButton.parentNode.removeChild(_statusModule2.default.inputButton);
        load(-2);
      });
      _statusModule2.default.inputButton.style.position = "absolute";
      _statusModule2.default.inputButton.style.height = body.clientHeight * 0.05 + 'px';
      var buttonPositionY = body.clientHeight / 2 - parseFloat(_statusModule2.default.inputButton.style.height.substring(0, _statusModule2.default.inputButton.style.height.length - 2) / 2);
      _statusModule2.default.inputButton.style.top = buttonPositionY + 'px';
      _statusModule2.default.inputButton.style.width = body.clientWidth * 0.15 + 'px';
      var buttonPositionX = body.clientWidth / 2 - parseFloat(_statusModule2.default.inputButton.style.width.substring(0, _statusModule2.default.inputButton.style.width.length - 2) / 2);
      _statusModule2.default.inputButton.style.left = buttonPositionX + 'px';
      _statusModule2.default.inputButton.innerHTML = "Save my Score";

      _statusModule2.default.playerNameInput.style.position = "absolute";
      _statusModule2.default.playerNameInput.style.height = body.clientHeight * 0.05 + 'px';
      var inputPositionY = body.clientHeight / 2 - parseFloat(_statusModule2.default.playerNameInput.style.height.substring(0, _statusModule2.default.playerNameInput.style.height.length - 2) / 2);
      _statusModule2.default.playerNameInput.style.top = inputPositionY - body.clientHeight * 0.07 + 'px';
      _statusModule2.default.playerNameInput.style.width = body.clientWidth * 0.15 + 'px';
      var inputPositionX = body.clientWidth / 2 - parseFloat(_statusModule2.default.playerNameInput.style.width.substring(0, _statusModule2.default.playerNameInput.style.width.length - 2) / 2);
      _statusModule2.default.playerNameInput.style.left = inputPositionX + 'px';
      _statusModule2.default.playerNameInput.placeholder = "Enter your name";

      body.append(_statusModule2.default.playerNameInput);
      body.append(_statusModule2.default.inputButton);
    } else if (_statusModule2.default.level === -2) {
      _statusModule2.default.music.stop();
      _statusModule2.default.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
      _statusModule2.default.highScoreText = [];
      _statusModule2.default.highScoreText[0] = scene.add.text(360, 24, "HIGH SCORES", {
        fontSize: '48px',
        fill: '#000'
      });
      var allScores = void 0;
      _APIcalls2.default.getHighestScores().then(function (resolution) {
        allScores = resolution.result;
        allScores.sort(function (a, b) {
          return b.score - a.score;
        });
        console.log(allScores);
        for (var i = 1; i < 7; i += 1) {
          _statusModule2.default.highScoreText[i] = scene.add.text(48, i * 90 + 48, i + ' - ' + allScores[i - 1].user + ' [Score: ' + allScores[i - 1].score + ']', {
            fontSize: '48px',
            fill: '#000'
          });
        }
        _statusModule2.default.highScoreText[7] = scene.add.text(48, 678, 'Press <ENTER> to return to the title screen', {
          fontSize: '36px',
          fill: '#000'
        });
      });
    } else if (_statusModule2.default.level === -1) {
      _statusModule2.default.music.stop();
      _statusModule2.default.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
      _statusModule2.default.titleScreen = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'title');
    } else {
      if (!_statusModule2.default.music.isPlaying) {
        _statusModule2.default.music.play();
      }
      _statusModule2.default.keys = scene.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE,ENTER');
      _statusModule2.default.livesText = scene.add.text(24, 24, 'Lives: ' + _statusModule2.default.lives, {
        fontSize: '32px',
        fill: '#000'
      });
      _statusModule2.default.player = scene.physics.add.sprite(0, 0, 'monty');
      _statusModule2.default.player.setCollideWorldBounds(true);
      _statusModule2.default.player.setScale(3);
      _statusModule2.default.playerDashShadow = scene.add.group();
      _statusModule2.default.platforms = scene.physics.add.staticGroup();
      _statusModule2.default.spines = scene.physics.add.staticGroup();
      _statusModule2.default.goal = scene.physics.add.sprite(0, 0, 'goal').setScale(2);
      _statusModule2.default.enemies = scene.physics.add.group({
        allowGravity: false
      });
      _statusModule2.default.curtain = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'white');
      _statusModule2.default.curtain.setScale(64, 48);
      _statusModule2.default.curtain.setDepth(100);
      scene.physics.add.collider(_statusModule2.default.goal, _statusModule2.default.spines);
      scene.physics.add.collider(_statusModule2.default.enemies, _statusModule2.default.platforms);
      scene.physics.add.overlap(_statusModule2.default.player, _statusModule2.default.enemies, playerDie, null, scene);
      scene.physics.add.collider(_statusModule2.default.player, _statusModule2.default.platforms);
      scene.physics.add.collider(_statusModule2.default.goal, _statusModule2.default.platforms);
      scene.physics.add.overlap(_statusModule2.default.player, _statusModule2.default.goal, winLevel, null, scene);
      scene.physics.add.overlap(_statusModule2.default.player, _statusModule2.default.spines, playerDie, null, scene);
      loadAnimations(scene);
    }
  };

  var clearGameObjects = function clearGameObjects() {
    _statusModule2.default.goal.disableBody(true, true);
    _statusModule2.default.livesText.destroy();
    _statusModule2.default.facing = 'right';
    _statusModule2.default.isDashing = false;
    _statusModule2.default.goal.disableBody(true, true);
    _statusModule2.default.player.disableBody(true, true);
    _statusModule2.default.enemies.children.iterate(function (enemy) {
      enemy.disableBody(true, true);
    });
    _statusModule2.default.platforms.children.iterate(function (platform) {
      platform.disableBody(true, true);
    });
    _statusModule2.default.spines.children.iterate(function (spine) {
      spine.disableBody(true, true);
    });
    _statusModule2.default.curtain.destroy();
    while (_statusModule2.default.playerDashShadow.getFirstAlive() != null) {
      _statusModule2.default.playerDashShadow.killAndHide(_statusModule2.default.playerDashShadow.getFirstAlive());
    }
    _statusModule2.default.finishLevel = false;
  };

  var winLevel = function winLevel() {
    if (_statusModule2.default.level < 5) {
      _statusModule2.default.level += 1;
    } else {
      _statusModule2.default.level = 1;
      _statusModule2.default.cycles += 1;
    }
    clearGameObjects();
    load(_statusModule2.default.level);
  };

  var playerDie = function playerDie() {
    if (_statusModule2.default.lives > 0) {
      _statusModule2.default.lives -= 1;
    } else {
      _statusModule2.default.score = _statusModule2.default.level + _statusModule2.default.cycles * 5;
      _statusModule2.default.level = -3;
      _statusModule2.default.lives = 4;
      _statusModule2.default.cycles = 0;
    }
    _statusModule2.default.livesText.setText('Lives: ' + _statusModule2.default.lives);
    clearGameObjects();
    load(_statusModule2.default.level);
  };

  var uncoverScene = function uncoverScene() {
    if (_statusModule2.default.curtain.alpha > 0) _statusModule2.default.curtain.alpha -= 0.01 + 0.01 * _statusModule2.default.curtain.alpha;
    if (_statusModule2.default.curtain.alpha < 0) _statusModule2.default.curtain.alpha = 0;
  };

  var coverScene = function coverScene() {
    if (_statusModule2.default.curtain.alpha < 1) _statusModule2.default.curtain.alpha += _statusModule2.default.curtain.alpha * 0.01 + 0.01;
    if (_statusModule2.default.curtain.alpha > 1) _statusModule2.default.curtain.alpha = 1;
  };

  var highScoresScreen = function highScoresScreen() {};

  var startScreen = function startScreen() {};

  var tutorial = function tutorial() {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }
    _levelHelper2.default.drawPlatformSquare(0, 0, 31, 0, 'top-tile');
    _levelHelper2.default.placePlayer(1, 2);
    _levelHelper2.default.placeGoal(30, 3);
  };

  var level1 = function level1(scene) {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }
    _levelHelper2.default.drawPlatformSquare(0, 0, 32, 0, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(27, 2, 32, 0, 'tile');
    _levelHelper2.default.drawPlatformSquare(27, 3, 32, 3, 'top-tile');
    _levelHelper2.default.placePlayer(3, 5);
    _levelHelper2.default.placeGoal(30, 4);
  };

  var level2 = function level2(scene) {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }
    _levelHelper2.default.drawPlatformSquare(0, 0, 12, 0, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(18, 0, 31, 0, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(13, 17, 0);
    _levelHelper2.default.drawPlatformSquare(18, 0, 25, 0, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(26, 0, 31, 6, 'tile');
    _levelHelper2.default.drawPlatformSquare(26, 7, 31, 7, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(16, 6, 17, 6, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(20, 2, 22, 2, 'top-tile');
    _levelHelper2.default.placePlayer(1, 2);
    _levelHelper2.default.placeGoal(30, 8);
  };

  var level3 = function level3(scene) {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }

    _levelHelper2.default.drawPlatformSquare(0, 0, 25, 0, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(15, 16, 28, 16, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingDown(15, 28, 15);
    _levelHelper2.default.drawPlatformSquare(11, 8, 14, 8, 'tile');
    _levelHelper2.default.drawPlatformSquare(13, 9, 14, 9, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(11, 12, 9);
    _levelHelper2.default.drawPlatformSquare(10, 9, 10, 9, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(10, 8, 10, 8, 'tile');
    _levelHelper2.default.drawPlatformSquare(5, 10, 7, 12, 'tile');
    _levelHelper2.default.drawPlatformSquare(5, 13, 7, 13, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(18, 0, 25, 0, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(26, 7, 26, 15, 'tile');
    _levelHelper2.default.drawPlatformSquare(26, 0, 31, 6, 'tile');
    _levelHelper2.default.drawPlatformSquare(27, 7, 31, 7, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(16, 5, 17, 5, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(20, 2, 22, 2, 'top-tile');
    _levelHelper2.default.placePlayer(1, 2);
    _levelHelper2.default.placeGoal(30, 8);
  };

  var level4 = function level4(scene) {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }
    _levelHelper2.default.drawPlatformSquare(0, 0, 31, 0, 'top-tile');
    _levelHelper2.default.drawSpineVerticalLineFacingRight(1, 23, 0);
    _levelHelper2.default.drawSpineVerticalLineFacingLeft(1, 18, 6);
    _levelHelper2.default.drawPlatformSquare(7, 0, 12, 18, 'tile');
    _levelHelper2.default.drawPlatformSquare(5, 19, 12, 19, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(5, 4, 6, 4, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(0, 8, 1, 8, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(5, 12, 6, 12, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(0, 16, 1, 16, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(13, 18, 1);
    _levelHelper2.default.drawPlatformSquare(19, 12, 27, 18, 'tile');
    _levelHelper2.default.drawPlatformSquare(19, 9, 20, 11, 'tile');
    _levelHelper2.default.drawPlatformSquare(19, 0, 27, 8, 'tile');
    _levelHelper2.default.drawPlatformSquare(19, 19, 27, 19, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(28, 31, 1);
    _levelHelper2.default.placePlayer(1, 2);
    _levelHelper2.default.placeGoal(21, 10);
  };

  var level5 = function level5(scene) {
    var enemyAmount = 0;
    if (_statusModule2.default.cycles <= 7) {
      enemyAmount = _statusModule2.default.cycles;
    } else {
      enemyAmount = 8;
    }
    for (var i = 1; i <= enemyAmount; i += 1) {
      var enemy = _levelHelper2.default.createEnemy(2 * i + 3, 21, 'gots');
      if (enemyAmount === 8) {
        enemy.velocity.x = enemy.velocity.x * (_statusModule2.default.cycles / 4);
        enemy.velocity.y = enemy.velocity.y * (_statusModule2.default.cycles / 4);
      }
    }
    _levelHelper2.default.drawPlatformSquare(0, 0, 6, 0, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(7, 31, 0);
    _levelHelper2.default.drawPlatformSquare(10, 8, 10, 15, 'tile');
    _levelHelper2.default.drawPlatformSquare(10, 16, 10, 16, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(14, 8, 14, 16, 'tile');
    _levelHelper2.default.drawPlatformSquare(15, 8, 31, 16, 'tile');
    _levelHelper2.default.drawPlatformSquare(14, 17, 14, 17, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(0, 16, 0, 16, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(0, 0, 0, 15, 'tile');
    _levelHelper2.default.drawPlatformSquare(1, 4, 1, 4, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(9, 8, 9, 8, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(1, 12, 1, 12, 'top-tile');
    _levelHelper2.default.drawPlatformSquare(9, 16, 9, 16, 'top-tile');
    _levelHelper2.default.drawSpineHorizontalLineFacingUp(15, 31, 17);
    _levelHelper2.default.drawPlatformSquare(15, 16, 31, 16, 'tile');
    _levelHelper2.default.placePlayer(1, 2);
    _levelHelper2.default.placeGoal(20, 3);
  };

  var load = function load(levelNumber) {
    var scene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : levelScene;

    levelScene = scene;
    _statusModule2.default.level = levelNumber;
    setupGameObjects(scene);
    switch (levelNumber) {
      case -3:
        //highScoresScreen(levelNumber, scene);
        break;
      case -2:
        //highScoresScreen(levelNumber, scene);
        break;
      case -1:
        startScreen();
        break;
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
        _statusModule2.default.level = -1;
        startScreen();
      //break;
    }
  };

  return {
    load: load,
    uncoverScene: uncoverScene,
    coverScene: coverScene
  };
}();

exports.default = levels;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelHelper = undefined;

var _statusModule = __webpack_require__(0);

var _statusModule2 = _interopRequireDefault(_statusModule);

var _helpers = __webpack_require__(5);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levelHelper = exports.levelHelper = function () {
  var placePlatformTile = function placePlatformTile(key, posX, posY) {
    _statusModule2.default.platforms.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), key).setScale(2).refreshBody();
  };

  var placeSpineTileFacingUp = function placeSpineTileFacingUp(posX, posY) {
    _statusModule2.default.spines.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), 'spinesup').setScale(2).refreshBody();
  };

  var placeSpineTileFacingDown = function placeSpineTileFacingDown(posX, posY) {
    _statusModule2.default.spines.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), 'spinesdown').setScale(2).refreshBody();
  };

  var placeSpineTileFacingLeft = function placeSpineTileFacingLeft(posX, posY) {
    _statusModule2.default.spines.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), 'spinesleft').setScale(2).refreshBody();
  };

  var placeSpineTileFacingRight = function placeSpineTileFacingRight(posX, posY) {
    _statusModule2.default.spines.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), 'spinesright').setScale(2).refreshBody();
  };

  var placeGoal = function placeGoal(posX, posY) {
    _statusModule2.default.goal.x = _helpers2.default.matrixPosX(posX);
    _statusModule2.default.goal.y = _helpers2.default.matrixPosY(posY);
  };

  var placePlayer = function placePlayer(posX, posY) {
    _statusModule2.default.player.x = _helpers2.default.matrixPosX(posX);
    _statusModule2.default.player.y = _helpers2.default.matrixPosY(posY);
  };

  var createEnemy = function createEnemy(posX, posY, key) {
    var newEnemy = _statusModule2.default.enemies.create(_helpers2.default.matrixPosX(posX), _helpers2.default.matrixPosY(posY), key);
    newEnemy.setScale(2);
    newEnemy.setBounce(1);
    newEnemy.setCollideWorldBounds(true, 1, 1);
    newEnemy.setVelocityX(Phaser.Math.Between(-300, 300));
    newEnemy.setVelocityY(Phaser.Math.Between(-300, 300));
    return newEnemy;
  };

  var drawPlatformSquare = function drawPlatformSquare(cornerX1, cornerY1, cornerX2, cornerY2, key) {
    var startX = Math.min(cornerX1, cornerX2);
    var startY = Math.min(cornerY1, cornerY2);
    var finishX = Math.max(cornerX1, cornerX2);
    var finishY = Math.max(cornerY1, cornerY2);

    for (var i = startX; i <= finishX; i += 1) {
      for (var j = startY; j <= finishY; j += 1) {
        placePlatformTile(key, i, j);
      }
    }
  };

  var drawSpineHorizontalLineFacingUp = function drawSpineHorizontalLineFacingUp(start, finish, posY) {
    var starting = Math.min(start, finish);
    var finishing = Math.max(start, finish);
    for (var i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingUp(i, posY);
    }
  };

  var drawSpineHorizontalLineFacingDown = function drawSpineHorizontalLineFacingDown(start, finish, posY) {
    var starting = Math.min(start, finish);
    var finishing = Math.max(start, finish);
    for (var i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingDown(i, posY);
    }
  };

  var drawSpineVerticalLineFacingLeft = function drawSpineVerticalLineFacingLeft(start, finish, posX) {
    var starting = Math.min(start, finish);
    var finishing = Math.max(start, finish);
    for (var i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingLeft(posX, i);
    }
  };

  var drawSpineVerticalLineFacingRight = function drawSpineVerticalLineFacingRight(start, finish, posX) {
    var starting = Math.min(start, finish);
    var finishing = Math.max(start, finish);
    for (var i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingRight(posX, i);
    }
  };

  return {
    placePlatformTile: placePlatformTile,
    placeGoal: placeGoal,
    placePlayer: placePlayer,
    drawPlatformSquare: drawPlatformSquare,
    drawSpineHorizontalLineFacingUp: drawSpineHorizontalLineFacingUp,
    drawSpineHorizontalLineFacingDown: drawSpineHorizontalLineFacingDown,
    drawSpineVerticalLineFacingLeft: drawSpineVerticalLineFacingLeft,
    drawSpineVerticalLineFacingRight: drawSpineVerticalLineFacingRight,
    createEnemy: createEnemy
  };
}();

exports.default = levelHelper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Each tile is 16x16, the canvas is 800x608
// So I'm creating a function that transforms
// the tiles into a 50x38 matrix and puts them into the correct place

var helpers = exports.helpers = function () {
  var matrixPosX = function matrixPosX(posX) {
    return 16 + posX * 32;
  };

  var matrixPosY = function matrixPosY(posY) {
    return 768 - (16 + posY * 32);
  };

  return {
    matrixPosX: matrixPosX,
    matrixPosY: matrixPosY
  };
}();

exports.default = helpers;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIcalls = undefined;

__webpack_require__(7);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var APIcalls = exports.APIcalls = function () {
  var saveScore = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, score) {
      var apiCall, sendingScore, apiData, savePromise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              apiCall = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/";
              sendingScore = "{\"user\":\"" + user + "\",\"score\":\"" + score + "\"}";
              apiData = {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: sendingScore
              };
              savePromise = new Promise(function (resolve, reject) {
                fetch(apiCall, apiData).then(function (response) {
                  if (response.status === 201) {
                    console.log(response);
                    resolve(response);
                  } else {
                    resolve("something went wrong");
                  }
                }).catch(function (error) {
                  reject(error);
                });
              });
              return _context.abrupt("return", savePromise);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function saveScore(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getHighestScores = function getHighestScores() {
    var apiCall = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/";
    var scoresPromise = new Promise(function (resolve, reject) {
      fetch(apiCall).then(function (response) {
        if (response.status === 200) {
          resolve(response.json());
        } else {
          resolve("something went wrong");
        }
      }).catch(function (error) {
        reject(error);
      });
    });
    return scoresPromise;
  };

  return {
    saveScore: saveScore,
    getHighestScores: getHighestScores
  };
}();

exports.default = APIcalls;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })
],[2]);