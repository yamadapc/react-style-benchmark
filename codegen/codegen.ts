const fs = require("fs");

interface StylePair {
  key: string;
  value: string;
}

interface StyleRule {
  name: string;
  componentName: string;
  attributes: StylePair[];
}

interface StyleModel {
  rules: StyleRule[];
}

const names = new Set();
function randomName(): string {
  const length = 6;
  const minCharCode = "a".charCodeAt(0);
  const maxCharCode = "z".charCodeAt(0);

  let str = "";
  for (let i = 0; i < length; i++) {
    const charCode =
      minCharCode + Math.floor(Math.random() * (maxCharCode - minCharCode));
    str += String.fromCharCode(charCode);
  }

  if (names.has(str)) {
    return randomName();
  } else {
    names.add(str);
  }

  return str;
}

function randomInt(limit: number): number {
  return Math.floor(Math.random() * limit);
}

function randomAttributeValue(): StylePair {
  const key = "background";
  const r = randomInt(255);
  const g = randomInt(255);
  const b = randomInt(255);
  const value = `rgb(${r}, ${g}, ${b})`;
  return {
    key,
    value,
  };
}

function generateRandomRule(): StyleRule {
  const name = randomName();
  const attributes = [];
  for (let i = 0; i < 10; i++) {
    attributes.push(randomAttributeValue());
  }
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    name,
    componentName,
    attributes,
  };
}

function generateStyleModel(size: number = 1000): StyleModel {
  const rules = [];

  for (let i = 0; i < size; i++) {
    rules.push(generateRandomRule());
  }

  return {
    rules,
  };
}

function renderAttributes(rule: StyleRule) {
  return rule.attributes
    .map((pair) => {
      return `    ${pair.key}: ${pair.value};`;
    })
    .join("\n");
}

function renderRuleComponent(rule: StyleRule) {
  const attributesStr = renderAttributes(rule);
  const componentStr = `
export const ${rule.componentName} = styled.div\`
${attributesStr}
\`;
        `;
  return componentStr;
}

function renderComponentsUsage(styleModel: StyleModel) {
  const jsxCalls = styleModel.rules
    .flatMap((rule) => {
      return [`<${rule.componentName} />`];
    })
    .join("\n");

  const usage = `
export const MainComponent = () => {
    return (
        <div className="MainComponent">
          ${jsxCalls}
        </div>
    );
};
`;
  return usage;
}

function generateStyledComponents(styleModel: StyleModel): string {
  let result = "";

  result += `
import styled from 'styled-components';
    `;

  styleModel.rules.forEach((rule) => {
    const componentStr = renderRuleComponent(rule);
    result += componentStr;
  });
  const usage = renderComponentsUsage(styleModel);
  result += usage;

  return result;
}

function generateCompiledCSS(styleModel: StyleModel) {
  const result = `
import { styled } from '@compiled/react';
  `;

  const componentsStr = styleModel.rules
    .map((rule) => {
      return renderRuleComponent(rule);
    })
    .join("\n");

  const usage = renderComponentsUsage(styleModel);

  const fileContents = result + componentsStr + usage;
  fs.writeFileSync('./src/compiled.tsx', fileContents);
}

function generateCSSModule(styleModel: StyleModel) {
  const cssModuleStr = styleModel.rules
    .map((rule) => {
      return `
.${rule.name} {
${renderAttributes(rule)}  
}
    `;
    })
    .join("\n");

  fs.writeFileSync("./src/css-modules.module.css", cssModuleStr);

  const jsxCalls = styleModel.rules
    .flatMap((rule) => {
      return [`<div className={styles.${rule.name}} />`];
    })
    .join("\n");

  const usage = `
import styles from './css-modules.module.css';

export const MainComponent = () => {
  return (
      <div className="MainComponent">
          ${jsxCalls}
      </div>
  );
};
  `;

  fs.writeFileSync("./src/css-modules.tsx", usage);
}

function main() {
  const styleModel = generateStyleModel();

  const styledComponentsStr = generateStyledComponents(styleModel);
  fs.writeFileSync("./src/styled.tsx", styledComponentsStr);

  generateCSSModule(styleModel);
  generateCompiledCSS(styleModel);
}

main();
