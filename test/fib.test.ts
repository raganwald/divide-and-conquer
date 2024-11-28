import {
  unfoldRefoldFor} from '../src/divide-and-conquer';
import { identity } from "../src/identity";

const isZeroOrOne = (n: number) => n === 0 || n === 1;

const fib = unfoldRefoldFor({
  isTerminal: isZeroOrOne, // does not appear to enforce `iSZeroOrOne` being a type predicate!
  mapTerminal: identity,
  unfold: (n: number) => [n - 1, n - 2],
  mapUnfolded: identity,
  refold: ([nMinusOne, nMinusTwo]: Iterable<number>) => nMinusOne + nMinusTwo
});

test('fib', () => {
  expect(fib(0)).toEqual(0);
  expect(fib(1)).toEqual(1);
  expect(fib(2)).toEqual(1);
  expect(fib(3)).toEqual(2);
  expect(fib(4)).toEqual(3);
  expect(fib(5)).toEqual(5);
  expect(fib(6)).toEqual(8);
});
