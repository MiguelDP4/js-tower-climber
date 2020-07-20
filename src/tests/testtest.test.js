import { convertToBool } from '../helpers';

test('returns true if yes', () => {
  expect(convertToBool('yes')).toBe(true);
});

test('returns true if yes', () => {
  expect(convertToBool('no')).toBe(false);
});