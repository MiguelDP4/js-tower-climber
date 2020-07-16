export const gameStatus = (() => {
  let titleScreen;
  let player;
  let platforms;
  let enemies;
  let goal;
  let level = -1;
  let lives = 4;
  let cycles = 0;
  let livesText;
  let dashDistance;
  let isDashing = false;
  let playerDashShadow;
  let facing = 'right';
  let curtain;
  let spines;
  let finishLevel = false;
  
  return {  titleScreen,
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
            finishLevel 
          };
})();

export default gameStatus;