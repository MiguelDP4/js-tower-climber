export const gameStatus = (() => {
  let player;
  let platforms;
  let goal;
  let level = 1;
  let dashDistance;
  let isDashing = false;
  let playerDashShadow;
  let facing = 'right';
  let curtain;
  let finishLevel = false;
  
  return {  level, 
            platforms, 
            player, 
            isDashing,
            playerDashShadow,
            dashDistance, 
            facing, 
            goal, 
            curtain, 
            finishLevel 
          };
})();

export default gameStatus;