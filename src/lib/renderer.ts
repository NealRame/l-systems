import type {
    ILSystemRenderDevice,
    TLSystemSymbols,
    TLSystemWord,
    TLSystemRenderingRulesMap,
} from "./types"

export type TRect = {
    x: number
    y: number
    w: number
    h: number
}

export class Path2DRendererDevice implements ILSystemRenderDevice {
    private states_: Array<number> = []
    
    private x_ = 0
    private xMin_ = 0
    private xMax_ = 0
    
    private y_ = 0
    private yMin_ = 0
    private yMax_ = 0
    
    private course_ = 0
    
    private d_: string
    
    private updatePosition_(len: number) {
        this.x_ = this.x_ + len*Math.cos(this.course_)
        this.y_ = this.y_ + len*Math.sin(this.course_)

        this.xMin_ = Math.min(this.xMin_, this.x_)
        this.xMax_ = Math.max(this.xMax_, this.x_)

        this.yMin_ = Math.min(this.yMin_, this.y_)
        this.yMax_ = Math.max(this.yMax_, this.y_)
    }
    
    public constructor() {
        this.d_ = `M${this.x_} ${this.y_}`
    }
    
    public noop(): void {
        // noop
    }
    
    public forward(len: number): void {
        this.updatePosition_(len)
        this.d_ = `${this.d_} L${this.x_} ${this.y_}`
    }

    public move(len: number): void {
        this.updatePosition_(len)
        this.d_ = `${this.d_} M${this.x_} ${this.y_}`
    }

    public turn(angle: number): void {
        this.course_ -= angle
    }

    public push(): void {
        this.states_.push(this.x_, this.y_, this.course_)
    }
    
    public pop(): void {
        if (this.states_.length < 3) {
            throw new Error("Stack is empty")
        }
        this.course_ = this.states_.pop()!
        this.y_ = this.states_.pop()!
        this.x_ = this.states_.pop()!
    }

    get path(): string {
        return this.d_
    }

    get rect(): TRect {
        return {
            x: this.xMin_,
            y: this.yMin_,
            w: this.xMax_ - this.xMin_,
            h: this.yMax_ - this.yMin_,
        }
    }
}

export function createRenderer<Alphabet extends TLSystemSymbols>(
    rules: TLSystemRenderingRulesMap,
) {
    return (
        word: TLSystemWord<Alphabet>,
        device: ILSystemRenderDevice,
    ) => {
        for (const symbol of word) {
            if (symbol in rules) {
                const [action, ...args] = rules[symbol]!

                // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
                ;(device[action] as Function).call(device, ...args) 
            }
        }
    }
}
