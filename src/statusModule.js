export const gameStatus = (() => {
  let player;
  let platforms;
  let goals;
  let level = 1;
  let isDashing = false;
  let facing = 'right';
  let curtain;
  let finishLevel = false;
  const clear = () => { 
    facing = 'right';
    isDashing = false;
    goals = null;
    player = null;
    platforms = null;
    level = 1;
    curtain = null;
    finishLevel = false;
  };
  return { level, platforms, player, isDashing, facing, goals, curtain, finishLevel, clear };
})();

export default gameStatus;