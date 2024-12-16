import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";
import postcss from "postcss";
import { getNestedProperty } from "./helper";
import { NAMED_COLORS } from "./constant/colors";
import { PROPERTY_MAP } from "./constant/property";

function cssToTailwindClass(prop: string, value: string) {
  let tailwindClass = "";
  let valueConfig = resolveConfig(tailwindConfig);
  const theme = valueConfig.theme || {};

  console.log(theme);

  const themeValue = getNestedProperty(theme, ["colors", value]);

  if (PROPERTY_MAP[prop] !== undefined && PROPERTY_MAP[prop] !== " ") {
    tailwindClass = !value.includes("-")
      ? `${PROPERTY_MAP[prop]}-${value}`
      : `-${PROPERTY_MAP[prop]}-${value}`;
  } else if (PROPERTY_MAP[prop] !== " ") {
    tailwindClass = value;
  } else {
    tailwindClass = "";
  }

  // switch (prop) {
  //   case "color": {
  //     const color = getNestedProperty(theme, ["colors", value]);
  //     if (color && !NAMED_COLORS[value]) {
  //       tailwindClass = `text-${value}`;
  //     } else if(NAMED_COLORS[value]) {
  //       tailwindClass = `text-[${NAMED_COLORS[value]}]`;
  //     }
  //     else {
  //       tailwindClass = `text-[${value}]`;
  //     }
  //     break;
  //   }
  //   case "width": {
  //     const width = getNestedProperty(theme, ["width", value]);
  //     if (width) {
  //       tailwindClass = `w-${value}`;
  //     } else {
  //       tailwindClass = `w-[${value}]`;
  //     }
  //     break;
  //   }
  //   case "margin": {
  //     const spacing = getNestedProperty(theme, ["spacing", value]);
  //     if (spacing) {
  //       tailwindClass = `m-${value}`;
  //     } else {
  //       tailwindClass = `m-[${value}]`;
  //     }
  //     break;
  //   }
  // }

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
