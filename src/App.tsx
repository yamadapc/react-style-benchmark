import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import { MainComponent as StyledMainComponent } from "./styled";
import { MainComponent as CSSModulesMainComponent } from "./css-modules";
import { MainComponent as CompiledCSSMainComponent } from "./compiled";

const h = document.location.hash;
const initialMode = h.replace("#", "") || "styled";

function afterRender(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cb();
    });
  });
}

function App() {
  const [mode, setMode] = useState(() => initialMode);
  const forceRender = useCallback(() => {
    setMode("");
    afterRender(() => {
      const startTime = performance.now();
      alert(`Cleared: startTime=${startTime}`);
      setMode(initialMode);
      afterRender(() => {
        const elapsed = performance.now() - startTime;
        alert(`Done: duration=${elapsed}`);
      });
    });
  }, []);

  return (
    <div className="App">
      <button onClick={forceRender} data-test-id="force-render">
        Force render
      </button>

      {mode === "styled" && <StyledMainComponent />}
      {mode === "modules" && <CSSModulesMainComponent />}
      {mode === "compiled" && <CompiledCSSMainComponent />}
    </div>
  );
}

export default App;
