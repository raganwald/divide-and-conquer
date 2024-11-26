import {
  unfoldRefoldFor,
  identity
} from '../src/divide-and-conquer';

import {
  RecursiveArray
} from '../src/recursive-collection';

// sum demonstrates a crude reduce on a recursive array

const isNumber = (n: number | RecursiveArray<number>) => typeof n === 'number';

const sum = unfoldRefoldFor(
  isNumber,
  identity,
  identity<RecursiveArray<number>>,
  (a: Iterable<number>): number => [...a].reduce((a, b) => a+b, 0)
);

test('sum', () => {
  expect(sum([])).toBe(0);
  expect(sum([0])).toBe(0);
  expect(sum([0, 1, 2])).toBe(3);
  expect(sum([0, 1, 2, 2])).toBe(5);
  expect(sum([0, [1, 2], 2])).toBe(5);
  expect(sum([0, [1, 2, [2]]])).toBe(5);
});
