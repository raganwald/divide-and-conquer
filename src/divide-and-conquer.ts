export function divideAndConquer<BaseType, CompoundType, BaseResultType, CompoundResultType>(
  isBase:
    (baseOrCompound: BaseType | CompoundType) => baseOrCompound is BaseType,
  mapBase: (base: BaseType) => BaseResultType,
  decompose: (compound: CompoundType) => ReadonlyArray<BaseType | CompoundType>,
  recompose: (arrayOfResults: ReadonlyArray<BaseResultType | CompoundResultType>) => CompoundResultType
): (input: BaseType | CompoundType) => (BaseResultType | CompoundResultType) {
  return function myself (input: BaseType | CompoundType): (BaseResultType | CompoundResultType) {
    if (isBase(input)) {
      return mapBase(input);
    } else {
      return recompose(
        decompose(input).map(myself)
      );
    }
  }
}

// useful default for some of the parameters to `divideAndConquer`
export function identity<SomeType>(something: SomeType): SomeType { return something; }
