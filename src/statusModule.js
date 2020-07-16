export const gameStatus = (() => {
  let player;
  let platforms;
  let goal;
  let level = 1;
  let lives = 4;
  let livesText;
  let dashDistance;
  let isDashing = false;
  let playerDashShadow;
  let facing = 'right';
  let curtain;
  let spines;
  let finishLevel = false;
  
  return {  level, 
            lives,
            livesText,
            platforms, 
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