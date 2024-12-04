// MVP is just enough to validate divide and conquer using the
// current functions that need to be written. We have the complexity
// of three functions: one to unfold, one to wrap transformation, and
// one to refold.
//
// TODO (very aspirational, not a priority): A type that constrains quadtrees to be uniform pyramids

import { unfoldRefoldFor } from "../src/divide-and-conquer";
import { isExponentOfTwo, isSquare, isTerminal, QuadTree, Region, scanner, terminalMapper, unfold, mapUnfolded, UnfoldedEntry, FoldableEntry, refold } from "../src/quad-tree";

/* these must all compile */

const a: QuadTree<number> = {
  nw: 1,
  ne: 2,
  se: 3,
  sw: 4, 
};

const b: QuadTree<number> = {
  nw: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4,
  },
  ne: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4,
  },
  se: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4,
  },
  sw: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4,
  }
};

const c: QuadTree<number> = {
  nw: {
    nw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    ne: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    se: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    sw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
  },
  ne: {
    nw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    ne: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    se: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    sw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
  },
  se: {
    nw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    ne: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    se: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    sw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
  },
  sw: {
    nw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    ne: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    se: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    },
    sw: {
      nw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      ne: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      se: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      },
      sw: {
        nw: 1,
        ne: 2,
        se: 3,
        sw: 4,
      }
    }
  }
};

// do not mix terminals and quads
// @ts-expect-error
const z: QuadTree<number> = {
  nw: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4, 
  },
  ne: 2,
  se: {
    nw: 1,
    ne: 2,
    se: 3,
    sw: 4,
  },
  sw: 4
}

test('scanner', () => {
  const mapping = {
    ' ': 0,
    '0': 0,
    '1': 1
  };

  expect(scanner(mapping, [])).toEqual([]);
  expect(scanner(mapping, ['00010011011111'])).toEqual(['00010011011111'.split('').map(x => parseInt(x))]);
  expect(scanner(mapping, ['00010011011111', '00110111110001'])).toEqual(
    ['00010011011111'.split('').map(x => parseInt(x)), '00110111110001'.split('').map(x => parseInt(x))]
  );

  expect(() => { scanner(mapping, ['00010011011111', '00110111x10001']) }).toThrow(RangeError); // bad char
});

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

test('unfold', () => {
  const eightBy: Region = { row: 0, column: 0, length: 8 };

  expect(unfold(eightBy)).toEqual([
    ['nw', { row: 0, column: 0, length: 4 }],
    ['ne', { row: 0, column: 4, length: 4 }],
    ['se', { row: 4, column: 4, length: 4 }],
    ['sw', { row: 4, column: 0, length: 4 }]
  ]);

  const se: Region = { row: 4, column: 4, length: 4 };

  expect(unfold(se)).toEqual([
    ['nw', { row: 4, column: 4, length: 2 }],
    ['ne', { row: 4, column: 6, length: 2 }],
    ['se', { row: 6, column: 6, length: 2 }],
    ['sw', { row: 6, column: 4, length: 2 }]
  ]);
});

function reader<TerminalInOutput>(sq: Array<Array<TerminalInOutput>>): QuadTree<TerminalInOutput> {
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


test('reader', () => {
  const mapping = {
    ' ': 0,
    '0': 0,
    '1': 1
  };

  // error cases
  expect(() => reader(scanner(mapping, []))).toThrow(RangeError); // empty is invalid
  expect(() => reader(scanner(mapping, [' ']))).toThrow(RangeError); // technically a square, and a power of two, but too small
  expect(() => reader(scanner(mapping, ['     1  ']))).toThrow(RangeError); // not a square
  expect(() => reader(scanner(mapping, ['   ', '  1', ' 1 ']))).toThrow(RangeError); // not an exponent of two in size
  expect(() => reader(scanner(mapping, ['   1', '  1 ', ' 1  ', '1 x ']))).toThrow(RangeError); // bad string
  expect(() => reader(scanner(mapping, ['   1', '  1 ', ' 1  ', '1   ']))).not.toThrow(RangeError); // an exponent of two in size
});
