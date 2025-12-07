import {
    Symbols,
} from "./constants"

export interface ILSystemRenderDevice {
    forward(len: number): void
    move(len: number): void
    turn(angle: number): void
    push(): void
    pop(): void
    noop(): void
}

export type TLSystemRenderAction = {
    [K in keyof ILSystemRenderDevice]: [K, ...Parameters<ILSystemRenderDevice[K]>]
}[keyof ILSystemRenderDevice]

export type TLSystemSymbols = typeof Symbols[number]

export type TLSystemWord<Alphabet extends TLSystemSymbols = TLSystemSymbols >
    = Array<Alphabet>

export type TLSystemProductionRulesMap<Alphabet extends TLSystemSymbols = TLSystemSymbols>
    = Partial<Record<Alphabet, TLSystemWord<Alphabet>>>

export type TLSystemRenderingRulesMap<Alphabet extends TLSystemSymbols = TLSystemSymbols>
    = Partial<Record<Alphabet, TLSystemRenderAction>>

export function defineLSystemAction<Alphabet extends TLSystemSymbols>(
    axiom: TLSystemWord<Alphabet>,
): TLSystemWord<Alphabet> {
    return axiom
}

export function defineLSystemProductionRules<Alphabet extends TLSystemSymbols>(
    rules: TLSystemProductionRulesMap<Alphabet>,
): TLSystemProductionRulesMap<Alphabet> {
    return rules
}

export function defineLSystemRenderingRules<Alphabet extends TLSystemSymbols>(
    actions: TLSystemRenderingRulesMap<Alphabet>
): TLSystemRenderingRulesMap<Alphabet> { return actions }
