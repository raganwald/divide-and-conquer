import { unfoldRefoldFor } from "./divide-and-conquer";

// union types are distributative through a conditional
export type QuadTree<T> = {
  nw: T,
  ne: T, 
  se: T,
  sw: T
} | {
  nw: QuadTree<T>,
  ne: QuadTree<T>, 
  se: QuadTree<T>,
  sw: QuadTree<T>
}

export function scanner<T>(mapping: { [key: string]: T; }, lines: Array<string>) {
  return lines.map(
    (line: string) => line.split('').map((key: string) => {
      const mapped: T | undefined = mapping[key];

      if (mapped === undefined) throw new RangeError('bad character');
      else return mapped;
    })
  );
}

export function isSquare<T>(sq: Array<Array<T>>): boolean {
  const numberOfRows = sq.length;

  if (numberOfRows === 0) return true; // wild edge casee
  else return sq.every(row => row.length === numberOfRows);
}

export function isExponentOfTwo(n: number): boolean {
  while (true) {
    if (n === 0) return true;
    if (n === 1) return true;
    if (n % 2 !== 0) return false;
    n = n / 2;
  }
}
export type Region = {
  row: number;
  column: number;
  length: number;
};

export function isRegion(something: any): something is Region {
  return something instanceof Object && something.hasOwnProperty('row') && something.hasOwnProperty('column') && something.hasOwnProperty('length');
} 

export function isTerminal<T>(node: T | Region): node is T {
  return isRegion(node) && node.length === 2;
} 

export function terminalMapper<TerminalInOutput>(sq: Array<Array<TerminalInOutput>>) {
  return (terminal: Region): QuadTree<TerminalInOutput> => {
    if (isRegion(terminal)) {
      const { row, column } = terminal;

      return {
        nw: sq[row][column],
        ne: sq[row][column + 1],
        se: sq[row + 1][column + 1],
        sw: sq[row + 1][column]
      }
    } else throw new RangeError('');
  };
}

export type UnfoldedEntry = [keyof QuadTree<void>, Region];
export type FoldableEntry<T> = [keyof QuadTree<T>, QuadTree<T>];

export const unfold = ({ row, column, length }: Region): Iterable<UnfoldedEntry> => {
  const halfLength = length / 2;
  if (halfLength < 2) throw new RangeError('cannot unfold a terminal');

  // deliberately mimics iterating over the entries of an object
  return [
    ['nw', { row, column, length: halfLength }],
    ['ne', { row, column: column + halfLength, length: halfLength }],
    ['se', { row: row + halfLength, column: column + halfLength, length: halfLength }],
    ['sw', { row: row + halfLength, column, length: halfLength }]
  ];
};

export function mapUnfolded<T>(f) {
  return ([key, value]: UnfoldedEntry): FoldableEntry<ReturnType<typeof f>> => [key, f(value)];
}

function isQuadTree<T>(node: { [key: string]: T | QuadTree<T>}): node is QuadTree<T> {
  const { nw, ne, se, sw } = node;
  return nw != null && ne != null && se != null && sw != null;
}

export function refold<T>(entries: Iterable<FoldableEntry<T>>): QuadTree<T> {
  const refoldedQuadTree: { [key: string]: QuadTree<T> } = Object.fromEntries(entries);

  if (isQuadTree(refoldedQuadTree)) return refoldedQuadTree;
  else throw new RangeError(`missing quad tree propertiesd, only supplied ${Object.keys(refoldedQuadTree).join(', ')}`);
}

export function reader<TerminalInOutput>(sq: Array<Array<TerminalInOutput>>): QuadTree<TerminalInOutput> {
  if (!isSquare(sq)) throw new RangeError('not square');
  if (sq.length < 2) throw new RangeError('too small');
  if (!isExponentOfTwo(sq.length)) throw new RangeError('not an exponent of two in length');

  // we have a large square array of sides 2^n where n > 1. It is stored in conventional
  // representation: an array of 2^n rows, each of which in an array with 2^n elements.
  // we are unfolding this array, using regions as the divide.
  type Tree = QuadTree<TerminalInOutput>;
  const ALL: Region = { row: 0, column: 0, length: sq.length };
  const mapTerminal = terminalMapper(sq);

  const toQuadTree = unfoldRefoldFor<Region, Region, UnfoldedEntry, FoldableEntry<TerminalInOutput>, QuadTree<TerminalInOutput>>({
    isTerminal,
    mapTerminal,
    unfold,
    mapUnfolded,
    refold
  });

  return toQuadTree(ALL);
}
