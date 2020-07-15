import gameStatus from './statusModule';
import helpers from "./helpers";

export const levelHelper = (() => {
  const placePlatformTile = (key, posX, posY) => {
    gameStatus.platforms.create(helpers.matrixPosX(posX), helpers.matrixPosY(posY), key).setScale(2).refreshBody();
  };

  const placeGoal = (posX, posY) => {
    gameStatus.goal.x = helpers.matrixPosX(posX);
    gameStatus.goal.y = helpers.matrixPosY(posY);
  };

  const placePlayer = (posX, posY) => {
    gameStatus.player.x = helpers.matrixPosX(posX);;
    gameStatus.player.y = helpers.matrixPosY(posY);;
  };

  const drawPlatformSquare = (cornerX1, cornerY1, cornerX2, cornerY2, key) => {
    let startX = Math.min(cornerX1, cornerX2);
    let startY = Math.min(cornerY1, cornerY2);
    let finishX = Math.max(cornerX1, cornerX2);
    let finishY = Math.max(cornerY1, cornerY2);

    for(let i = startX; i <= finishX; i +=1 ) {
      for(let j = startY; j <= finishY; j += 1) {
        placePlatformTile(key, i, j);
      }
    }
  };

  return {
    placePlatformTile,
    placeGoal,
    placePlayer,
    drawPlatformSquare
  };
})();

export default levelHelper;