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
  var level = -1;
  var lives = 4;
  var cycles = 0;
  var livesText = void 0;
  var dashDistance = void 0;
  var isDashing = false;
  var playerDashShadow = void 0;
  var facing = 'right';
  var curtain = void 0;
  var spines = void 0;
  var finishLevel = false;

  return {
    titleScreen: titleScreen,
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
    finishLevel: finishLevel
  };
}();

exports.default = gameStatus;

/***/ }),
/* 1 */,
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _levels = __webpack_require__(4);

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
var keys = void 0;
var maxVelX = void 0;
var accelerationX = void 0;
var jumpVel = void 0;
var maxDashDistance = void 0;
var dashDistance = void 0;
var shadowKillTimer = void 0;

function preload() {
  keys = this.input.keyboard.addKeys('W,S,A,D,SHIFT,SPACE');
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
}

function create() {
  _levels2.default.load(-1, this);
}

function update() {
  if (_statusModule2.default.level === -1) {
    console.log(_statusModule2.default.level);
    if (keys.SPACE.isDown) {
      _statusModule2.default.level += 1;
      _statusModule2.default.titleScreen.destroy();
      _levels2.default.load(_statusModule2.default.level);
    }
  } else {
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

    if (keys.SHIFT.isUp && _statusModule2.default.player.body.touching.down) {
      dashDistance = maxDashDistance;
    }

    if (keys.A.isDown) {
      _statusModule2.default.facing = 'left';
      if (keys.SHIFT.isDown && dashDistance > 0) {
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
    } else if (keys.D.isDown) {
      _statusModule2.default.facing = 'right';
      if (keys.SHIFT.isDown && dashDistance > 0) {
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
      if (keys.SHIFT.isDown && dashDistance > 0) {
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

    if (keys.SPACE.isDown && _statusModule2.default.player.body.touching.down) {
      _statusModule2.default.player.setVelocityY(-1 * jumpVel);
    }

    if (keys.SPACE.isUp && !_statusModule2.default.player.body.touching.down && _statusModule2.default.player.body.velocity.y < -1 * jumpVel / 2) {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = undefined;

var _helpers = __webpack_require__(2);

var _helpers2 = _interopRequireDefault(_helpers);

var _levelHelper = __webpack_require__(5);

var _levelHelper2 = _interopRequireDefault(_levelHelper);

var _statusModule = __webpack_require__(0);

var _statusModule2 = _interopRequireDefault(_statusModule);

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
    if (_statusModule2.default.level === -1) {
      _statusModule2.default.titleScreen = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'title');
    } else {
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
      _statusModule2.default.level = -1;
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
    setupGameObjects(scene);
    _statusModule2.default.level = levelNumber;
    switch (levelNumber) {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelHelper = undefined;

var _statusModule = __webpack_require__(0);

var _statusModule2 = _interopRequireDefault(_statusModule);

var _helpers = __webpack_require__(2);

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

/***/ })
],[3]);