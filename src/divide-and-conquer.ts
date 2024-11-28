
// I fear I am making a hylomorphism over directed acyclic graphs:
// https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)#Trees
//
// TODO: Do not assume that unfold returns a terminal or unfoldable. what if it's
// something like a pair identifying a quadtree's child position by name instead
// of by fixed order in a list? Would need to be able to unpack, transform, and
// repack. That feels like a Mo—... Never mind.
//
// With respect to defaults, the problem is that I want them most for the special case
// where types line up (.e.g terminal and compound are the same type, or the iterable
// over folded children *is* the refolded output)
//
// Am I confusing recursion with monadic mapping M(a) -> M(b)?

import { IterableMap } from "./iterable-map";

// - adding the Foldable type
// - represents a value that is Terminal | Unfolded optionally with context
// -   e.g. If an Unfoldable is an array, there is no context as the order
//     of iteration is sufficient to reconstrcut an array. However, if an
//     Unfoldable is a Map, the iteration will likely be key-value pairs.
//     
// Problem: Tree of numbers
// Domain types: Terminal, Unfoldable, Folded
//
// { number, RecursiveIterable<number>, number | RecursiveIterable<number> }
//
// Between Unfoldable and Folded we have the context types, Unfolded and Foldable.
// These permit the use of context in conjunction with a function that can map
// (input: Terminal | Unfoldable) => Folded to the type (u: Unfolded) => Foldable.
//
// When there is no context, Unfoleded should extend and be extended by 

export function unfoldRefoldFor<Terminal, Unfoldable, Unfolded, Foldable, Folded>(
  {
    isTerminal,
    mapTerminal,
    unfold,
    mapUnfolded,
    refold
  }: {
    isTerminal:
      (maybeTerminal: Terminal | Unfoldable) => maybeTerminal is Terminal,
    mapTerminal: (terminal: Terminal) => Folded,
    unfold: (unfoldable: Unfoldable) => Iterable<Unfolded>,
    mapUnfolded: (func: (f: Terminal | Unfoldable) => Folded) => (u: Unfolded) => Foldable,
    refold: (results: Iterable<Foldable>) => Folded // clients are expected to deal with an iterable here
  }
): (input: Terminal | Unfoldable) => Folded {
  const unfoldedMapper: (u: Unfolded) => Foldable = mapUnfolded(unfoldRefold);

  return unfoldRefold;

  function unfoldRefold (input: Terminal | Unfoldable): Folded {
    if (isTerminal(input)) {
      return mapTerminal(input);
    } else {
      const unfolded: Iterable<Unfolded> = unfold(input);
      const unfoldedRefoldedUnfolded: Iterable<Foldable> =
        new IterableMap(unfoldedMapper, unfolded);
      const refoldedAllTheWayDown = refold(unfoldedRefoldedUnfolded);

      return refoldedAllTheWayDown;
    }
  }
}
