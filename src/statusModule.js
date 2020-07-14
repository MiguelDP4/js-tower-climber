export const gameStatus = (() => {
  let player;
  let platforms;
  let goals;
  let level = 1;
  let isDashing = false;
  let facing = 'right';
  const clear = () => { 
    facing = 'right';
    isDashing = false;
    goals = null;
    player = null;
    platforms = null;
    level = 1;
  };
  return { level, platforms, player, isDashing, facing, goals, clear };
})();

export default gameStatus;