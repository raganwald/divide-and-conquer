// TODO: do not assume that unfold returns a terminal or unfoldable. what if it's
// something like a pair identifying a quadtree's child position by name instead
// of by fixed order in a list? Would need to be able to unpack, transform, and
// repack. That feels like a Mo—... Never mind.
//
// I fear I am making a hylomorphism over directed acyclic graphs:
// https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)#Trees
//
// Naming convention: Unfold-Fold metaphor.
// types here are not exported, but their names document intention

class IterableMap<Source, Mapped> { 
  map: (s: Source) => Mapped;
  source: Iterable<Source>;

  constructor(map: (s: Source) => Mapped, source: Iterable<Source>) {
    this.map = map;
    this.source = source;
  }

  [Symbol.iterator]() {
    return (function* (map, source) {
      for (const s of source) {
        yield map(s);
      }
    })(this.map, this.source);
  }
}

export function unfoldRefoldFor<Terminal, Unfoldable, Folded>(
  isTerminal:
    (maybeUnfoldable: Terminal | Unfoldable) => maybeUnfoldable is Terminal,
  mapTerminal: (terminal: Terminal) => Folded,
  unfold: (unfoldable: Unfoldable) => Iterable<Terminal | Unfoldable>,
  refold: (results: Iterable<Folded>) => Folded // clients are expected to deal with an iterable here
): (input: Terminal | Unfoldable) => Folded {
  return function unfoldRefold (input: Terminal | Unfoldable): Folded {
    if (isTerminal(input)) {
      return mapTerminal(input);
    } else {
      const unfolded: Iterable<Terminal | Unfoldable> = unfold(input);
      const unfoldedRefoldedUnfolded = new IterableMap(unfoldRefold, unfolded);
      const refoldedAllTheWayDown = refold(unfoldedRefoldedUnfolded);

      return refoldedAllTheWayDown
    }
  }
}

// useful default for some of the parameters to `divideAndConquer`
export function identity<SomeType>(something: SomeType): SomeType { return something; }
