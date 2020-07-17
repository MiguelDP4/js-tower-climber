// Each tile is 16x16, the canvas is 800x608
// So I'm creating a function that transforms
// the tiles into a 50x38 matrix and puts them into the correct place

export const helpers = (() => {
  const matrixPosX = (posX) => 16 + (posX * 32);

  const matrixPosY = (posY) => 768 - (16 + posY * 32);

  return {
    matrixPosX,
    matrixPosY,
  };
})();

export default helpers;