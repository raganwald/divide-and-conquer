import { isExponentOfTwo, isSquare, isTerminal, terminalMapper } from "../src/quad-tree";

test('isSquare', () => {
  expect(isSquare([])).toBe(true);
  expect(isSquare([[0]])).toBe(true);
  expect(isSquare([[0, 1]])).toBe(false);
  expect(isSquare([[0, 1], [1, 0]])).toBe(true);
});

test('isExponentOfTwo', () => {
  expect(isExponentOfTwo(0)).toBe(true);
  expect(isExponentOfTwo(1)).toBe(true);
  expect(isExponentOfTwo(2)).toBe(true);
  expect(isExponentOfTwo(3)).toBe(false);
  expect(isExponentOfTwo(4)).toBe(true);
  expect(isExponentOfTwo(5)).toBe(false);
  expect(isExponentOfTwo(6)).toBe(false);
  expect(isExponentOfTwo(7)).toBe(false);
  expect(isExponentOfTwo(8)).toBe(true);
});

test('isTerminal', () => {
  expect(isTerminal({ row: 0, column: 0, length:  2 })).toBe(true);
  expect(isTerminal({ row: 0, column: 0, length:  4 })).toBe(false);
  expect(isTerminal({ row: 0, column: 0, length:  8 })).toBe(false);
  expect(isTerminal({ row: 0, column: 0, length: 16 })).toBe(false);
});

test('terminalMapper', () => {
  const mapTerminal = terminalMapper<number>([
    [0, 0],
    [0, 1]
  ]);

  expect(mapTerminal({ row: 0, column: 0, length: 2})).toEqual({ nw: 0, ne: 0, se: 1, sw: 0 });
});
