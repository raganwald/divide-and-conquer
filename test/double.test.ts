import {
  unfoldRefoldFor} from '../src/divide-and-conquer';
import { identity } from "../src/identity";

import {
  RecursiveIterable
} from '../src/recursive-collection';

// double demonstrates a crude map on a recursive collection

const isTerminal = (n) => typeof n === 'number';
const mapTerminal = (n: number) => n * 2;

test('double array', () => {
  const double = unfoldRefoldFor({
    isTerminal,
    mapTerminal,
    unfold: identity<RecursiveIterable<number>>,
    mapUnfolded: identity<(s: number | RecursiveIterable<number>) => (number | RecursiveIterable<number>)>,
    refold: (i: Iterable<number | RecursiveIterable<number>>) => [...i]
  });

  expect(double([]              )).toEqual([]              );
  expect(double([0]             )).toEqual([0]             );
  expect(double([0,  1, 2]      )).toEqual([0,  2, 4]      );
  expect(double([0,  1, 2,  2]  )).toEqual([0,  2, 4,  4]  );
  expect(double([0, [1, 2], 2]  )).toEqual([0, [2, 4], 4]  );
  expect(double([0, [1, 2, [2]]])).toEqual([0, [2, 4, [4]]]);
});

test('double pojo', () => {
  type RecursivePojo<T> = { [key: string]: T | RecursivePojo<T> };
  type RecursivePojoEntry<T> = [string, T | RecursivePojo<T>];

  type Terminal = number;
  type Unfoldable = RecursivePojo<Terminal>;
  type Node = Terminal | Unfoldable;
  type Unfolded = RecursivePojoEntry<Terminal>;
  type Foldable = RecursivePojoEntry<Terminal>;
  type Folded = Node;

  const double = unfoldRefoldFor({
    isTerminal,
    mapTerminal,
    unfold: (pojo): Iterable<Unfolded> => Object.entries(pojo),
    mapUnfolded: (f) => ([key, value]: Unfolded): Foldable => [key, f(value)],
    refold: (entries: Iterable<Foldable>):Folded => Object.fromEntries(entries)
  });

  expect(double({})).toEqual({});
  expect(double({ a: 0 })).toEqual({ a: 0 });
  expect(double({ a: 0, b: 1, c: 2 })).toEqual({ a: 0, b: 2, c: 4 });
  expect(double({ a: 0, b: 1, c: 2, d: 2 })).toEqual({ a: 0, b: 2, c: 4, d: 4 });
  expect(double({ a: 0, b: { a: 1, b: 2 }, c: 2 })).toEqual({ a: 0, b: { a: 2, b: 4 }, c: 4 });
  expect(double({ a: 0, b: { a: 1, b: 2, c: { a: 2 } } })).toEqual({ a: 0, b: { a: 2, b: 4, c: { a: 4 } } });
});
