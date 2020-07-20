import { helpers } from '../helpers';

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosX(5)).toBe(176);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosX(9)).toBe(304);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosX(15)).toBe(496);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosX(23)).toBe(752);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosX(31)).toBe(1008);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosY(23)).toBe(16);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosY(0)).toBe(752);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosY(15)).toBe(272);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosY(10)).toBe(432);
});

test('Gets the adequate tile position for them to be on a grid', () => {
  expect(helpers.matrixPosY(20)).toBe(112);
});

test('generates a random number between a min and a max', () => {
  expect(helpers.randomBetween(0, 10)).toBeGreaterThanOrEqual(0);
  expect(helpers.randomBetween(0, 10)).toBeLessThanOrEqual(10);
});

test('generates a random number between a min and a max', () => {
  expect(helpers.randomBetween(-100, 100)).toBeGreaterThanOrEqual(-100);
  expect(helpers.randomBetween(-100, 100)).toBeLessThanOrEqual(100);
});

test('generates a random number between a min and a max', () => {
  expect(helpers.randomBetween(-1000, 1000)).toBeGreaterThanOrEqual(-1000);
  expect(helpers.randomBetween(-1000, 1000)).toBeLessThanOrEqual(1000);
});