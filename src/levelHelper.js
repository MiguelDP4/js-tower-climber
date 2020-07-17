import gameStatus from './statusModule';
import helpers from './helpers';

export const levelHelper = (() => {
  const placePlatformTile = (key, posX, posY) => {
    gameStatus.platforms.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), key).setScale(2).refreshBody();
  };

  const placeSpineTileFacingUp = (posX, posY) => {
    gameStatus.spines.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), 'spinesup').setScale(2).refreshBody();
  };

  const placeSpineTileFacingDown = (posX, posY) => {
    gameStatus.spines.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), 'spinesdown').setScale(2).refreshBody();
  };

  const placeSpineTileFacingLeft = (posX, posY) => {
    gameStatus.spines.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), 'spinesleft').setScale(2).refreshBody();
  };

  const placeSpineTileFacingRight = (posX, posY) => {
    gameStatus.spines.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), 'spinesright').setScale(2).refreshBody();
  };

  const placeGoal = (posX, posY) => {
    gameStatus.goal.x = helpers.matrixPosX(posX);
    gameStatus.goal.y = helpers.matrixPosY(posY);
  };

  const placePlayer = (posX, posY) => {
    gameStatus.player.x = helpers.matrixPosX(posX);
    gameStatus.player.y = helpers.matrixPosY(posY);
  };

  const createEnemy = (posX, posY, key) => {
    const newEnemy = gameStatus.enemies.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), key);
    newEnemy.setScale(2);
    newEnemy.setBounce(1);
    newEnemy.setCollideWorldBounds(true, 1, 1);
    newEnemy.setVelocityX(Phaser.Math.Between(-300, 300));
    newEnemy.setVelocityY(Phaser.Math.Between(-300, 300));
    return newEnemy;
  };

  const drawPlatformSquare = (cornerX1, cornerY1, cornerX2, cornerY2, key) => {
    const startX = Math.min(cornerX1, cornerX2);
    const startY = Math.min(cornerY1, cornerY2);
    const finishX = Math.max(cornerX1, cornerX2);
    const finishY = Math.max(cornerY1, cornerY2);

    for (let i = startX; i <= finishX; i += 1) {
      for (let j = startY; j <= finishY; j += 1) {
        placePlatformTile(key, i, j);
      }
    }
  };

  const drawSpineHorizontalLineFacingUp = (start, finish, posY) => {
    const starting = Math.min(start, finish);
    const finishing = Math.max(start, finish);
    for (let i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingUp(i, posY);
    }
  };

  const drawSpineHorizontalLineFacingDown = (start, finish, posY) => {
    const starting = Math.min(start, finish);
    const finishing = Math.max(start, finish);
    for (let i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingDown(i, posY);
    }
  };

  const drawSpineVerticalLineFacingLeft = (start, finish, posX) => {
    const starting = Math.min(start, finish);
    const finishing = Math.max(start, finish);
    for (let i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingLeft(posX, i);
    }
  };

  const drawSpineVerticalLineFacingRight = (start, finish, posX) => {
    const starting = Math.min(start, finish);
    const finishing = Math.max(start, finish);
    for (let i = starting; i <= finishing; i += 1) {
      placeSpineTileFacingRight(posX, i);
    }
  };

  return {
    placePlatformTile,
    placeGoal,
    placePlayer,
    drawPlatformSquare,
    drawSpineHorizontalLineFacingUp,
    drawSpineHorizontalLineFacingDown,
    drawSpineVerticalLineFacingLeft,
    drawSpineVerticalLineFacingRight,
    createEnemy,
  };
})();

export default levelHelper;