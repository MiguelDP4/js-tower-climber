export const gameStatus = (() => {
  let player;
  let platforms;
  let goal;
  let level = 1;
  let isDashing = false;
  let facing = 'right';
  let curtain;
  let finishLevel = false;
  
  return { level, platforms, player, isDashing, facing, goal, curtain, finishLevel };
})();

export default gameStatus;