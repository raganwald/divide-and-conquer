
// I fear I am making a hylomorphism over directed acyclic graphs:
// https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)#Trees
//
// TODO: Allow the use of a plain predicate for isTerminal when the TypeScript
// types of a terminal and a compound are the same. Example: Fibonacci, where
// the terminals are `0` and `1`, and the compounds are `> 1`, and they all are
// of type `number`. 
//
// TODO: Do not assume that unfold returns a terminal or unfoldable. what if it's
// something like a pair identifying a quadtree's child position by name instead
// of by fixed order in a list? Would need to be able to unpack, transform, and
// repack. That feels like a Mo—... Never mind.

import { IterableMap } from "./iterable-map";

export function unfoldRefoldFor<Terminal, Unfoldable, Folded>(
  isTerminal:
    (maybeTerminal: Terminal | Unfoldable) => maybeTerminal is Terminal,
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
