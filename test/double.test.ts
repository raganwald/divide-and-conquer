import {
  unfoldRefoldFor,
  identity
} from '../src/divide-and-conquer';

import {
  RecursiveArray
} from '../src/recursive-collection';

// double demonstrates a crude map on a recursive array
//
// TODO: Why do I have to know the difference between a recursive iterable and a recursive array?
//       Or, why can't I decide how the mapping is going to work?
//
// Bottom line; Refctor until this works with RecursiveArray. As a client, I should be expected to
// use the concrete types, and the internal function should only "genericize" for its own convenience
// this may require. Like... An iterable over the elements? Fine, should be Iterable<Recursive...>

const isNumber = (n: number | RecursiveArray<number>) => typeof n === 'number';

const double = unfoldRefoldFor(
  isNumber, // isTerminal
  (n: number) => n * 2, // mapTerminal
  identity<RecursiveArray<number>>, // unfold
  (i: Iterable<number | RecursiveArray<number>>) => [...i]
);

test('double', () => {
  expect(double([]              )).toEqual([]              );
  expect(double([0]             )).toEqual([0]             );
  expect(double([0,  1, 2]      )).toEqual([0,  2, 4]      );
  expect(double([0,  1, 2,  2]  )).toEqual([0,  2, 4,  4]  );
  expect(double([0, [1, 2], 2]  )).toEqual([0, [2, 4], 4]  );
  expect(double([0, [1, 2, [2]]])).toEqual([0, [2, 4, [4]]]);
});
