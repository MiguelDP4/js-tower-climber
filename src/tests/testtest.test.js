import { convertToBool } from '../helpers.js';

test('returns true if yes', () => {
  expect(convertToBool('yes')).toBe(true);
});

test('returns true if yes', () => {
  expect(convertToBool('no')).toBe(false);
});