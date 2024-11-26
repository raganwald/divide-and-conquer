export type RecursiveArray<T> = ReadonlyArray<T | RecursiveArray<T>>;
