import {
    describe,
    expect,
    it,
    vi,
} from "vitest"

import {
    type ILSystemRenderDevice,
    createRenderer,
    defineLSystemRenderingRules,
} from "../lib"

const MockedRenderDevice = vi.fn(class implements ILSystemRenderDevice {
    forward = vi.fn((_: number) => {
        // NOOP
    })

    move = vi.fn((_: number) => {
        // NOOP
    })

    noop = vi.fn(() => {
        // NOOP
    })

    pop = vi.fn(() => {
        // NOOP
    })

    push = vi.fn(() => {
        // NOOP
    })

    turn = vi.fn((_: number) => {
        // NOOP
    })
})

describe("l-system-renderer", () => {
    const rendererRules = defineLSystemRenderingRules({
        "F": ["forward", 1],
        "+": ["turn", +Math.PI/3],
        "-": ["turn", -Math.PI/3],
    })

    const render = createRenderer(rendererRules)

    it("render correctly call device operations", () => {
        {
            const device = new MockedRenderDevice()
    
            render(["F"], device)
            expect(device.forward).toHaveBeenCalledExactlyOnceWith(1)
        } {
            const device = new MockedRenderDevice()

            render(["F", "+", "F", "-", "F", "-", "F", "+", "F"], device)

            expect(device.forward).toHaveBeenCalledTimes(5)
            expect(device.forward).toHaveBeenNthCalledWith(1, 1)
            expect(device.forward).toHaveBeenNthCalledWith(2, 1)
            expect(device.forward).toHaveBeenNthCalledWith(3, 1)
            expect(device.forward).toHaveBeenNthCalledWith(4, 1)
            expect(device.forward).toHaveBeenNthCalledWith(5, 1)

            expect(device.turn).toHaveBeenCalledTimes(4)
            expect(device.turn).toHaveBeenNthCalledWith(1, +Math.PI/3)
            expect(device.turn).toHaveBeenNthCalledWith(2, -Math.PI/3)
            expect(device.turn).toHaveBeenNthCalledWith(3, -Math.PI/3)
            expect(device.turn).toHaveBeenNthCalledWith(4, +Math.PI/3)
        }
    })
})
