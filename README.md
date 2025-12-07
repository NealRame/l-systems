# l-system

A toy project I'm using to develop the workflow for my portfolio site.

If you've made it this far, you're probably lost or you have an interest for
[_LSystems_](https://en.wikipedia.org/wiki/L-system) and that some sort of
search engine leads you here (which is very unlikely given the number of
results that surely should come before this page).

In the later case, you'll surely find something better elsewhere ;-)

Nevertheless, if you're still here, welcome and here's how to use this library.

## Usage

```ts
import {
    createGenerator,
    defineLSystemProductionRules,
    Path2DRendererDevice,
} from "@nealrame/l-system"

const generatorRules = defineLSystemProductionRules({
    "F": ["F", "+", "F", "-", "F", "-", "F", "+", "F"],
})
const rendererRules = defineLSystemRenderingRules({
    "F": ["forward", 1],
    "+": ["turn", +Math.PI/3],
    "-": ["turn", -Math.PI/3],
})

const generate = createGenerator(generatorRules)
const render = createRenderer(rendererRules)

const device = new Path2DRendererDevice

const word = generate(["F"], 3)

render(word, device)

const { path, rect } = device
const viewBox = `${rect.x} ${rect.y} ${rect.w} ${rect.h}`

const svg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
    <path d=${device.path} fill="none" stroke="black" stroke-width="1px"/>
</svg>`
```
