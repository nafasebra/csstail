const postcss = require('postcss');
const postcssJs = require('postcss-js');

// Dictionary mapping CSS properties/values to Tailwind classes
const cssToTailwind: Record<string, string> = {
  "color:red": "text-red-500",
  "margin:10px": "m-2.5",
  // Add more mappings as needed
};

// Function to parse CSS and return Tailwind equivalent
export async function parseCssToTailwind(cssCode: string): Promise<string> {
  const root = postcss.parse(cssCode);
  let result = '';

  root.walkDecls((decl: {prop: string, value: string}) => {
    if (!decl.prop.trim() || !decl.value.trim()) {
      return;  // Ignore empty or whitespace-only properties/values
    }

    const cssRule = `${decl.prop}:${decl.value}`;
    if (cssToTailwind[cssRule]) {
      result += `${cssToTailwind[cssRule]} `;
    } else {
      result += `@apply ${decl.prop}-${decl.value};\n`;
    }
  });

  return result.trim();
}