import { levelHelper } from '../levelHelper';
import { gameStatus } from '../statusModule';

test('Gets the adequate tile position for them to be on a grid', () => {
  gameStatus.spines = scene.physics.add.staticGroup();
  levelHelper.placeSpineTileFacingUp(5, 0);
  expect(gameStatus.spines.children).toBe(176);
});
