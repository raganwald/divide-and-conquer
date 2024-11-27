import { IterableMap } from "../src/iterable-map";

test('mapping arrays and the use of ...', () => {
  const double = (n: number) => n * 2;

  expect([...new IterableMap(double, [ ])]).toEqual([]);
  expect([...new IterableMap(double, [0])]).toEqual([0]);
  expect([...new IterableMap(double, [1])]).toEqual([2]);
  expect([...new IterableMap(double, [1, 2, 3])]).toEqual([2, 4, 6]);
});

test('laziness', () => {
  let functionCallCount = 0;
  const double = (n: number) => (++functionCallCount, n * 2);
  const one23 = new IterableMap(double, [1, 2, 3]);

  expect(functionCallCount).toEqual(0); // creating a map doesn't invoke it
  [...one23];
  expect(functionCallCount).toEqual(3); // the count is upodated when you iterate over the contents
});

test('reentrancy', () => {
  const double = (n: number) => n * 2;
  const one23 = new IterableMap(double, [1, 2, 3]);

  expect([...one23]).toEqual([2, 4, 6]);
  expect([...one23]).toEqual([2, 4, 6]); // it is an iterable, not an iteration
});