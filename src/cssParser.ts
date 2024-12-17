import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";
import postcss from "postcss";
import { getNestedProperty } from "./helper";
import { NAMED_COLORS } from "./constant/colors";
import { PROPERTY_MAP, THEME_PATH_MAP } from "./constant/property";

function cssToTailwindClass(prop: string, value: string) {
  let tailwindClass = "";
  let valueConfig = resolveConfig(tailwindConfig);
  const theme = valueConfig.theme || {};

  console.log(theme);

  if (PROPERTY_MAP[prop] !== undefined && PROPERTY_MAP[prop] !== " ") {
    const themeValue = getNestedProperty(theme, [THEME_PATH_MAP[prop], value]);
    if(THEME_PATH_MAP[prop] === 'colors') {
      if (themeValue && !NAMED_COLORS[value]) {
        tailwindClass = `${PROPERTY_MAP[prop]}-${themeValue}`;
      } else if (NAMED_COLORS[value]) {
        tailwindClass = `${PROPERTY_MAP[prop]}-[${NAMED_COLORS[value]}]`;
      }
      else {
        tailwindClass = `${PROPERTY_MAP[prop]}-[${value}]`;
      }
    } else {
      if (themeValue) {
        tailwindClass = !value.includes("-")
          ? `${PROPERTY_MAP[prop]}-${themeValue}`
          : `-${PROPERTY_MAP[prop]}-${themeValue}`;
      } else {
        tailwindClass = `${PROPERTY_MAP[prop]}-[${value}]`;
      }
    }
  } else if (PROPERTY_MAP[prop] !== " ") {
    const themeValue = getNestedProperty(theme, [THEME_PATH_MAP[prop], value]);
    if (themeValue) {
      tailwindClass = themeValue;
    }
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
