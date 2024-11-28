import {
  unfoldRefoldFor} from '../src/divide-and-conquer';
import { identity } from "../src/identity";

import {
  RecursiveArray,
  RecursiveIterable
} from '../src/recursive-collection';

// sum demonstrates a crude reduce on a recursive array

const isNumber = (n: number | RecursiveIterable<number>) => typeof n === 'number';

test('sum', () => {
  const sum = unfoldRefoldFor({
    isTerminal: isNumber,
    mapTerminal: identity,
    unfold: identity<RecursiveIterable<number>>,
    mapUnfolded: identity,
    refold: (a: Iterable<number>): number => [...a].reduce((a, b) => a+b, 0)
  });
  
  expect(sum([])).toBe(0);
  expect(sum([0])).toBe(0);
  expect(sum([0, 1, 2])).toBe(3);
  expect(sum([0, 1, 2, 2])).toBe(5);
  expect(sum([0, [1, 2], 2])).toBe(5);
  expect(sum([0, [1, 2, [2]]])).toBe(5);
});
