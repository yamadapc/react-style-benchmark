# react-style-benchmark

## What is this?
This repository sets-up a couple of CSS-in-JS solutions and compiled CSS to
run performance tests against them.

A script generates a set of 1000 CSS rules. For each rule, 10 `background-color`
attributes are generated with random values.

A component is generated and exported to render each of the rules 3 times.

`bin/generate-reports.sh` then loads the app in lighthouse with each of the
configurations and outputs the "total blocking time" metric, which is what we
care about.

**Tests were only ran once, which is not the best**, however the performance
difference between the solutions is so huge the results are still indicative of
the issue I'm trying to surface.

## Why?
In my experience, CSS-in-JS is several times slower than very old standard
styling solutions at scale. A solution with good performance **can** be built,
but would require a LOT of engineering effort. Standard editing, linting,
pre-processing tools will all have to be built from scratch to support an EDSL
for CSS in JavaScript that has no overhead.

1000 rules is not unthinkable, neither is a DOM tree size of 3000
elements for a large app.

CSS in JS performs 2-4x worse on this micro-benchmark for production builds and
up to 7x worse during development.

Other than performance, development experience with CSS-in-JS may suffer because:

* It's harder to support hot-reloading of JavaScript than CSS, thus some large
  apps that could have instant hot-reloading of styles won't due to their usage
  of CSS-in-JS
* They are really slow in development builds (3-7x as shown in "development
  build" runs)
* Bad editor support
* ...

## Overview

I ran this on a Macbook Pro M1 Pro with 8x CPU slowdown.

These are the results:

|                            | CSS Modules | Compiled CSS | Styled components |
| -------------------------- | ----------- | ------------ | ----------------- |
| **Blocking time**          | 120ms       | 280ms        | 420ms             |
| **Relative blocking time** | 1x          | 2.3x         | 3.5x              |
| **TTI**                    | 2.7s        | 2.9s         | 3.0s              |

Compiled CSS is configured to use compile time extraction through its webpack
loader, which should be stripping some runtime cost. Still, there is
runtime work, which explains the difference in results.

The main metric we are interested in is **blocking time**, we want to measure
the overhead of this styling solution.

Dynamic styles are not considered yet. Re-renders were also not measured yet.
Results might differ if the page had been SSR-ed with style-sheet extraction.
Since all "modes" load all dependencies for all solutions, overall TTI is
unimportant.

Each page rendered 3000 components, with 1000 unique (+/-) rules.

## Development build

Tests were conducted over a production build and would look incredibly worse for
CSS-in-JS if using a development build.

I believe this is harmful, because developers are unlikely to build
performant apps if their dev-builds have incredibly bad performance, which they
do with CSS-in-JS.

**Development build numbers:**

|                            | CSS Modules | Compiled CSS | Styled components |
| -------------------------- | ----------- | ------------ | ----------------- |
| **Blocking time**          | 1670ms      | 5170ms       | 11390ms           |
| **Relative blocking time** | 1x          | 3x           | 6.8x              |

## Links to the app

* [Styled Components URL](https://react-style-benchmark.surge.sh#styled)
* [Compiled CSS URL](https://react-style-benchmark.surge.sh#compiled)
* [CSS Modules URL](https://react-style-benchmark.surge.sh#modules)
