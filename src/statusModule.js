export const gameStatus = (() => {
  let player;
  let platforms;
  let goal;
  let level = 1;
  let dashDistance;
  let isDashing = false;
  let facing = 'right';
  let curtain;
  let finishLevel = false;
  
  return { level, platforms, player, isDashing, dashDistance, facing, goal, curtain, finishLevel };
})();

export default gameStatus;