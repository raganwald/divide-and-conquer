export function compose<T,U,V>(f: (b: U) => V, g: (a: T) => U): (c: T) => V {
  return (c:T): V => f(g(c));
}
