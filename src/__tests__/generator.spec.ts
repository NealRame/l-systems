import {
    describe,
    expect,
    it,
} from "vitest"

import {
    createGenerator,
    defineLSystemProductionRules,
} from "../lib"

describe("l-system-generator", () => {
    const rules = defineLSystemProductionRules({
        "F": ["F", "+", "F", "-", "F", "-", "F", "+", "F"],
    })
    const generate = createGenerator(rules)

    it("generate works for n=0", () => {
        expect(generate(["F"], 0)).toStrictEqual(["F"])
    })
    
    it("generate works for n=1", () => {
        expect(generate(["F"], 1)).toStrictEqual([
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
        ])
    })
    
    it("generate works for n=2", () => {
        expect(generate(["F"], 2)).toStrictEqual([
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
            "+",
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
            "-",
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
            "-",
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
            "+",
            "F", "+", "F", "-", "F", "-", "F", "+", "F",
        ])
    })
})
