// useful default for some of the parameters to `divideAndConquer`

export function identity<T>(something: T): T { return something; }

export function identityMap<T, U>(func: (g: T) => U) { return func; }
