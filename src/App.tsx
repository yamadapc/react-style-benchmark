import React from "react";
import "./App.css";

import { MainComponent as StyledMainComponent } from "./styled";
import { MainComponent as CSSModulesMainComponent } from "./css-modules";
import { MainComponent as CompiledCSSMainComponent } from "./compiled";

const h = document.location.hash;
console.log(h);
const mode = h.replace("#", "") || "styled";

function App() {
  return (
    <div className="App">
      {mode === "styled" && <StyledMainComponent />}
      {mode === "modules" && <CSSModulesMainComponent />}
      {mode === "compiled" && <CompiledCSSMainComponent />}
    </div>
  );
}

export default App;
