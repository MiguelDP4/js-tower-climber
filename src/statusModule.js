export const gameStatus = (() => {
  let titleScreen;
  let player;
  let platforms;
  let enemies;
  let goal;
  const level = -1;
  const lives = 4;
  const cycles = 0;
  let livesText;
  let dashDistance;
  const isDashing = false;
  let playerDashShadow;
  const facing = 'right';
  let curtain;
  let spines;
  const finishLevel = false;

  return {
    titleScreen,
    level,
    lives,
    livesText,
    cycles,
    platforms,
    enemies,
    player,
    isDashing,
    playerDashShadow,
    dashDistance,
    facing,
    goal,
    curtain,
    spines,
    finishLevel,
  };
})();

export default gameStatus;