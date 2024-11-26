export type RecursiveArray<T> = ReadonlyArray<T | RecursiveArray<T>>;

export type RecursiveArrayOrElement<T> = T | RecursiveArray<T>;
