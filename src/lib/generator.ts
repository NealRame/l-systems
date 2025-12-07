import type {
    TLSystemSymbols,
    TLSystemWord,
    TLSystemProductionRulesMap,
} from "./types"

export function createSymbolTransformer<Alphabet extends TLSystemSymbols>(
    rules: TLSystemProductionRulesMap<Alphabet>,
) {
    return (symbol: Alphabet) => rules[symbol] ?? [symbol]
}

export function createWordTransformer<Alphabet extends TLSystemSymbols>(
    rules: TLSystemProductionRulesMap<Alphabet>,
) {
    const transformSymbol = createSymbolTransformer(rules)
    return (word: TLSystemWord<Alphabet>) => word.flatMap(transformSymbol)
}

export function createGenerator<Alphabet extends TLSystemSymbols>(
    rules: TLSystemProductionRulesMap<Alphabet>,
) {
    const transformWord = createWordTransformer(rules)
    return function generate(
        axiom: TLSystemWord<Alphabet>,
        steps: number,
    ): TLSystemWord<Alphabet> {
        if (steps === 0) {
            return axiom
        } else {
            return transformWord(generate(axiom, steps - 1))
        }
    }
}
