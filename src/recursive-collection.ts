export type RecursiveArray<T> = ReadonlyArray<T | RecursiveArray<T>>;

export type RecursiveIterable<T> = Iterable<T | RecursiveIterable<T>>;
