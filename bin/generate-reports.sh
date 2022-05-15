#!/usr/bin/env bash

mkdir -p reports
lighthouse "http://localhost:30000#compiled" --throttling.cpuSlowdownMultiplier=8 --output-path=reports/compiled-css.html
lighthouse "http://localhost:30000#styled" --throttling.cpuSlowdownMultiplier=8 --output-path=reports/styled-components.html
lighthouse "http://localhost:30000#modules" --throttling.cpuSlowdownMultiplier=8 --output-path=reports/css-modules.html

lighthouse "http://localhost:30000#compiled" --throttling.cpuSlowdownMultiplier=8 --output=json --output-path=reports/compiled-css.json
lighthouse "http://localhost:30000#styled" --throttling.cpuSlowdownMultiplier=8 --output=json --output-path=reports/styled-components.json
lighthouse "http://localhost:30000#modules" --throttling.cpuSlowdownMultiplier=8 --output=json --output-path=reports/css-modules.json
