import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";
import postcss from "postcss";
import { getNestedProperty } from "./helper";

function cssToTailwindClass(prop: string, value: string) {
  let tailwindClass = "";
  let valueConfig = resolveConfig(tailwindConfig);
  const theme = valueConfig.theme || {};

  switch (prop) {
    case "color": {
      const color = getNestedProperty(theme, ["colors", value]);
      if (color) {
        // Match predefined Tailwind colors
        tailwindClass = `text-${value}`;
      } else {
        // Handle arbitrary values
        tailwindClass = `text-[${value}]`;
      }
      break;
    }
    case "background-color": {
      const color = getNestedProperty(theme, ["colors", value]);
      if (color) {
        // Match predefined Tailwind colors
        tailwindClass = `bg-${value}`;
      } else {
        // Handle arbitrary values
        tailwindClass = `bg-[${value}]`;
      }
      break;
    }
    case "margin": {
      const spacing = getNestedProperty(theme, ["spacing", value]);
      if (spacing) {
        tailwindClass = `m-${value}`;
      }
      break;
    }
    case "padding": {
      const spacing = getNestedProperty(theme, ["spacing", value]);
      if (spacing) {
        tailwindClass = `p-${value}`;
      }
      break;
    }
    case "font-size": {
      const fontSize = getNestedProperty(theme, ["fontSize", value]);
      if (fontSize) {
        tailwindClass = `text-${value}`;
      }
      break;
    }

    default:
      break;
  }

  console.log(tailwindClass);
  return tailwindClass;
}

// Usage in your parse function
export function initialConverting(cssCode: string) {
  const root = postcss.parse(cssCode);
  let result = " ";

  for (const decl of root.nodes) {
    if (decl.type === "decl") {
      const tailwindClass = cssToTailwindClass(decl.prop, decl.value);
      if (tailwindClass) {
        result += `${tailwindClass} `;
      }
    }
  }

  return result;
}
