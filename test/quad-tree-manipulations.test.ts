import { compose } from "../src/compose";
import { unfoldRefoldFor } from "../src/divide-and-conquer";
import { identity } from "../src/identity";
import { FoldableEntry, mapUnfolded, QuadTree, refold, UnfoldedEntry } from "../src/quad-tree";

// A starting point
type FoldableFor<Terminal> = Terminal | QuadTree<Terminal>;

type IsTerminal<Terminal> = (unknown: FoldableFor<Terminal>) => unknown is Terminal;

type AfterRefold<Terminal> = (refolded: QuadTree<Terminal>) => QuadTree<Terminal>;

type DuplicateOptions<Terminal> = {
  isTerminal: IsTerminal<Terminal>,
  afterRefold?: AfterRefold<Terminal>
}

function duplicate<Terminal>({ isTerminal, afterRefold }: DuplicateOptions<Terminal>) {
  const fullyRefolded = afterRefold
    ? compose<Iterable<FoldableEntry<Terminal>>, QuadTree<Terminal>, QuadTree<Terminal>>(afterRefold, refold)
    : refold;

  return  (source: FoldableFor<Terminal>): FoldableFor<Terminal> => {
    type Unfoldable = QuadTree<Terminal>;
    type Folded = FoldableFor<Terminal>;
    type Unfolded = UnfoldedEntry<FoldableFor<Terminal>>;
    type Foldable = UnfoldedEntry<FoldableFor<Terminal>>;

    const mapTerminal = identity<Terminal>;;
    
    // (unfoldable: Unfoldable) => Iterable<Unfolded>
    const unfold = (folded: Unfoldable): Iterable<Unfolded> => [
      ['nw', folded.nw],
      ['ne', folded.ne],
      ['se', folded.se],
      ['sw', folded.sw]
    ];

    return unfoldRefoldFor<Terminal, Unfoldable, Unfolded, Foldable, Folded>({
      isTerminal,
      mapTerminal,
      unfold,
      mapUnfolded,  // a decorator that unwraps the unfolded and then rewarps the foldatble
                    // to accomodate context such as foru quadrants
      refold: fullyRefolded
    })(source);
  };
}

type Terminal = number;
const isTerminal = (something: FoldableFor<Terminal>): something is Terminal => typeof something === 'number';

const one234: QuadTree<Terminal> = { nw: 1, ne: 2, se: 3, sw: 4 };
const two143: QuadTree<Terminal> = { nw: 2, ne: 1, se: 4, sw: 3 };
const two341: QuadTree<Terminal> = { nw: 2, ne: 3, se: 4, sw: 1 };
const three412: QuadTree<Terminal> = { nw: 3, ne: 4, se: 1, sw: 2 };
const four123: QuadTree<Terminal> = { nw: 4, ne: 1, se: 2, sw: 3 };
const four321: QuadTree<Terminal> = { nw: 4, ne: 3, se: 2, sw: 1 };
const oneDeeper: QuadTree<number> = { nw: one234, ne: two341, se: three412, sw: four123 };
const oneDeeperWiddershins: QuadTree<number> = { se: one234, sw: two341, nw: three412, ne: four123 };

test('duplicate', () => {
  expect(duplicate<number>({isTerminal})(1)).toBe(1);
  expect(duplicate<number>({isTerminal})(one234)).toEqual(one234); // it must duplicate
  expect(duplicate<number>({isTerminal})(one234)).not.toBe(one234); // by making a copy
  expect(duplicate<number>({isTerminal})(oneDeeper)).toEqual(oneDeeper); // it must duplicate
  expect(duplicate<number>({isTerminal})(oneDeeper)).not.toBe(oneDeeper); // by making a copy
});

type QuadrantMap = { [Property in keyof QuadTree<Terminal>]: keyof QuadTree<Terminal> };
const mapWith = (map: QuadrantMap) =>
  (refolded: QuadTree<Terminal>): QuadTree<Terminal> => ({
    nw: refolded[map.nw],
    ne: refolded[map.ne],
    se: refolded[map.se],
    sw: refolded[map.sw]
  } as QuadTree<Terminal>); // TODO: Fix this?

test('rotate', () => {
  const widdershins: QuadrantMap = {
    nw: 'ne',
    ne: 'se',
    se: 'sw',
    sw: 'nw'
  };

  expect(duplicate<number>({ isTerminal, afterRefold: mapWith(widdershins) })(1)).toBe(1);
  expect(duplicate<number>({ isTerminal, afterRefold: mapWith(widdershins) })(one234)).toEqual(two341); // rotate
  expect(duplicate<number>({ isTerminal, afterRefold: mapWith(widdershins) })(oneDeeper)).toEqual(oneDeeperWiddershins); // rotate rotations
});

test('mirrors', () => {
  const vertical: QuadrantMap = {
    nw: 'ne',
    ne: 'nw',
    se: 'sw',
    sw: 'se'
  };
  expect(duplicate<number>({isTerminal, afterRefold: mapWith(vertical) })(1)).toBe(1);
  expect(duplicate<number>({isTerminal, afterRefold: mapWith(vertical) })(one234)).toEqual(two143); // reflection on vertical axis

  const horizontal: QuadrantMap = {
    nw: 'sw',
    ne: 'se',
    se: 'ne',
    sw: 'nw'
  };
  expect(duplicate<number>({isTerminal, afterRefold: mapWith(horizontal) })(1)).toBe(1);
  expect(duplicate<number>({isTerminal, afterRefold: mapWith(horizontal) })(one234)).toEqual(four321); // reflection on vertical axis
});
