// Each tile is 16x16, the canvas is 800x608
// So I'm creating a function that transforms 
// the tiles into a 50x38 matrix and puts them into the correct place

export const helpers = (() => {
  const matrixPosX = (posX) => {
    return 8 + (posX * 16);
  };

  const matrixPosY = (posY) => {
    return 608 - (8 + posY * 16);
  };

  return {  matrixPosX, 
            matrixPosY 
          };
})();

export default helpers;