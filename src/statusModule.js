export const gameStatus = (() => {
  let player;
  let platforms;
  let level = 1;

  return { level, platforms, player };
})();

export default gameStatus;