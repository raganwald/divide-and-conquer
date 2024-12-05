// MVP is just enough to validate divide and conquer using the
// current functions that need to be written. We have the complexity
// of three functions: one to unfold, one to wrap transformation, and
// one to refold.
//
// TODO (very aspirational, not a priority): A type that constrains quadtrees to be uniform pyramids

import { QuadTree, Region, reader, scanner, unfold } from "../src/quad-tree";

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

  // error case
  expect(() => { scanner(mapping, ['00010011011111', '00110111x10001']) }).toThrow(RangeError); // bad char

  // successful cases (some of which will be filtered later)
  expect(scanner(mapping, [])).toEqual([]);
  expect(scanner(mapping, ['00010011011111'])).toEqual(['00010011011111'.split('').map(x => parseInt(x))]);
  expect(scanner(mapping, ['00010011011111', '00110111110001'])).toEqual(
    ['00010011011111'.split('').map(x => parseInt(x)), '00110111110001'.split('').map(x => parseInt(x))]
  );

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

  // 00
  // 01

  // terminal case
  expect(reader(scanner(mapping, ['00', '01']))).toEqual({ nw: 0, ne: 0, se: 1, sw: 0 });

  // 10 | 00
  // 01 | 00
  // ---+---
  // 00 | 01
  // 00 | 10

  // compound case
  expect(reader(scanner(mapping, ['1000', '0100', '0001', '0010']))).toEqual({
    nw: { nw: 1, ne: 0, se: 1, sw: 0 },
    ne: { nw: 0, ne: 0, se: 0, sw: 0 },
    se: { nw: 0, ne: 1, se: 0, sw: 1 },
    sw: { nw: 0, ne: 0, se: 0, sw: 0 }
  });

});
