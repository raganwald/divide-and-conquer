import {
  divideAndConquer,
  identity
} from '../src/divide-and-conquer';

const isZeroOrOne = (n: number) => n === 0 || n === 1;

const fib = divideAndConquer(
  isZeroOrOne,
  identity,
  (n: number) => [n - 1, n - 2],
  ([nMinusOne, nMinusTwo]: ReadonlyArray<number>) => nMinusOne + nMinusTwo
);

test('fib', () => {
  expect(fib(0)).toEqual(0);
  expect(fib(1)).toEqual(1);
  expect(fib(2)).toEqual(1);
  expect(fib(3)).toEqual(2);
  expect(fib(4)).toEqual(3);
  expect(fib(5)).toEqual(5);
  expect(fib(6)).toEqual(8);
});
