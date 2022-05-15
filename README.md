# react-style-benchmark
This repository sets-up a couple of CSS-in-JS solutions and compiled CSS to 
run performance tests against them.

A script generates a set of 1000 CSS rules. For each rule, 10 `background-color`
attributes are generated with random values.

A component is generated and exported to render each of the rules 3 times.

`bin/generate-reports.sh` then loads the app in lighthouse with each of the
configurations and outputs the "total blocking time" metric, which is what we
care about.

I ran this on a Macbook Pro M1 Pro with 8x CPU slowdown.

These are the results:

|                   | CSS Modules | Compiled CSS | Styled components |
|-------------------|-------------|--------------|-------------------|
| **TTI**           | 2.7s        | 2.9s         | 3.0s              |
| **Blocking time** | 120ms       | 280ms        | 420ms             |

