import helpers from "./helpers";
import gameStatus from './statusModule';
export const levels = (() => {
  const setupGameObjects = (scene) => {
    gameStatus.player = scene.physics.add.sprite(0,0,'monty');
    gameStatus.player.setCollideWorldBounds(true);
    gameStatus.player.setScale(2);
    gameStatus.platforms = scene.physics.add.staticGroup();
    scene.physics.add.collider(gameStatus.player, gameStatus.platforms);
  };

  const load = (levelNumber, scene) => {
    setupGameObjects(scene);
    switch(levelNumber) {
      case 0:
        gameStatus.level = levelNumber;
        plain();
        break;
      case 1:

        break;
      default:

    }
  };

  const plain = () => {
    for(let i = 0; i <= 50; i+= 1){
      gameStatus.platforms.create(helpers.matrixPosX(i), helpers.matrixPosY(0), 'top-tile');
    }
    gameStatus.player.x = 100;
    gameStatus.player.y = 500;
  };

  const level1 = (scene) => {

  };

  return {  load
          };
})();

export default levels;