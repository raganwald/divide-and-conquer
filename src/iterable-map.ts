// It is a contract of this map that it preserves the order of the iterable
// (obviously. and yet...)
export class IterableMap<Source, Mapped> { 
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
