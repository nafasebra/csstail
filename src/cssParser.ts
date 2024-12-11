import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";
import postcss from "postcss";
import { getNestedProperty } from "./helper";

function cssToTailwindClass(prop: string, value: string) {
  let tailwindClass = "";
  let valueConfig = resolveConfig(tailwindConfig);
  const theme = valueConfig.theme || {};

  console.log(theme);

  switch (prop) {
    case "color": {
      const color = getNestedProperty(theme, ["colors", value]);
      if (color) {
        tailwindClass = `text-${value}`;
      } else {
        tailwindClass = `text-[${value}]`;
      }
      break;
    }
    case "width": {
      const width = getNestedProperty(theme, ["width", value]);
      if (width) {
        tailwindClass = `w-${value}`;
      } else {
        tailwindClass = `w-[${value}]`;
      }
      break;
    }
    case "height": {
      const height = getNestedProperty(theme, ["height", value]);
      if (height) {
        tailwindClass = `h-${value}`;
      } else {
        tailwindClass = `h-[${value}]`;
      }
      break;
    }
    case "background-color": {
      const color = getNestedProperty(theme, ["colors", value]);
      if (color) {
        tailwindClass = `bg-${value}`;
      } else {
        tailwindClass = `bg-[${value}]`;
      }
      break;
    }
    case "margin": {
      const spacing = getNestedProperty(theme, ["spacing", value]);
      if (spacing) {
        tailwindClass = `m-${value}`;
      } else {
        tailwindClass = `m-[${value}]`;
      }
      break;
    }
    case "padding": {
      const spacing = getNestedProperty(theme, ["spacing", value]);
      if (spacing) {
        tailwindClass = `p-${value}`;
      } else {
        tailwindClass = `p-[${value}]`;
      }
      break;
    }
    case "font-size": {
      const fontSize = getNestedProperty(theme, ["fontSize", value]);
      if (fontSize) {
        tailwindClass = `text-${value}`;
      } else {
        tailwindClass = `text-[${value}]`;
      }
      break;
    }
    case "font-family": {
      const fontFamily = getNestedProperty(theme, ["fontFamily", value]);
      if (fontFamily) {
        tailwindClass = `font-${value}`;
      }
      break;
    }
    case "font-weight": {
      const fontWeight = getNestedProperty(theme, ["fontWeight", value]);
      if (fontWeight) {
        tailwindClass = `font-${value}`;
      }
      break;
    }
    case "line-height": {
      const lineHeight = getNestedProperty(theme, ["lineHeight", value]);
      if (lineHeight) {
        tailwindClass = `leading-${value}`;
      } else {
        tailwindClass = `leading-[${value}]`;
      }
      break;
    }
    case "letter-spacing": {
      const letterSpacing = getNestedProperty(theme, ["letterSpacing", value]);
      if (letterSpacing) {
        tailwindClass = `tracking-${value}`;
      } else {
        tailwindClass = `tracking-[${value}]`;
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
  let result = "";

  for (const decl of root.nodes) {
    if (decl.type === "decl") {
      const tailwindClass = cssToTailwindClass(decl.prop, decl.value);
      if (tailwindClass) {
        result += ` ${tailwindClass}`;
      }
    }
  }

  return result;
}
