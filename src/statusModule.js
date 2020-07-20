export const gameStatus = (() => {
  let titleScreen;
  let player;
  let platforms;
  let enemies;
  let goal;
  let playerNameInput;
  let inputButton;
  let level;
  const lives = 4;
  const cycles = 0;
  let highScoreScreen;
  let highScoreText;
  let livesText;
  let dashDistance;
  const isDashing = false;
  let playerDashShadow;
  const facing = 'right';
  let curtain;
  let spines;
  const finishLevel = false;
  let keys;
  let score;
  let music;

  return {
    titleScreen,
    highScoreScreen,
    highScoreText,
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
    playerNameInput,
    inputButton,
    keys,
    score,
    music
  };
})();

export default gameStatus;