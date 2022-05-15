#!/usr/bin/env bash

lighthouse "http://localhost:6000#compiled" --throttling.cpuSlowdownMultiplier=8 --output-path=compiled-css.html
lighthouse "http://localhost:6000#styled" --throttling.cpuSlowdownMultiplier=8 --output-path=styled-components.html
lighthouse "http://localhost:6000#modules" --throttling.cpuSlowdownMultiplier=8 --output-path=css-modules.html
