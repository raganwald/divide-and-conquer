import {
  divideAndConquer,
  identity
} from '../src/divide-and-conquer';

import {
  RecursiveArray,
  RecursiveArrayOrElement
} from '../src/recursive-array';

// double demonstrates a crude map on a recursive array

const isNumber = (n: RecursiveArrayOrElement<number>) => typeof n === 'number';

const double = divideAndConquer(
  isNumber,
  (n: number) => n * 2,
  identity<RecursiveArray<number>>,
  identity<RecursiveArray<number>>
);

test('double', () => {
  expect(double([]              )).toEqual([]              );
  expect(double([0]             )).toEqual([0]             );
  expect(double([0,  1, 2]      )).toEqual([0,  2, 4]      );
  expect(double([0,  1, 2,  2]  )).toEqual([0,  2, 4,  4]  );
  expect(double([0, [1, 2], 2]  )).toEqual([0, [2, 4], 4]  );
  expect(double([0, [1, 2, [2]]])).toEqual([0, [2, 4, [4]]]);
});
