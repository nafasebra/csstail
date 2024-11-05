import * as vscode from "vscode";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from 'tailwindcss/defaultConfig';
import postcss from "postcss";

async function loadTailwindConfig() {
  let userConfig = {};

  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
      const configPath = `${workspaceFolders[0].uri.fsPath}/tailwind.config.js`;
      userConfig = await import(configPath);
    }
  } catch (error) {
    vscode.window.showErrorMessage("Failed to load Tailwind configuration. it used default tailwind config");
    console.error(error);
  }

  return resolveConfig({ ...tailwindConfig, ...userConfig });
}

function cssToTailwindClass(prop: string, value: string): string | null {
  const tailwindConfig  = loadTailwindConfig();
  if (!tailwindConfig) {
    return "";
  }

  if (prop === "color" && tailwindConfig?.theme.colors[value]) {
    return `text-${value}`; // Map colors
  } else if (prop === "margin" && tailwindConfig?.theme.spacing[value]) {
    return `m-${value}`; // Map spacing values
  }
  // Add more mappings as needed
  return null;
}

// Usage in your parse function
export async function initialConverting(cssCode: string): Promise<string> {
  const root = postcss.parse(cssCode);
  let result = "";

  root.walkDecls((decl) => {
    const tailwindClass = cssToTailwindClass(decl.prop, decl.value);
    if (tailwindClass) {
      result += `${tailwindClass} `;
    } else {
      result += `@apply ${decl.prop}-${decl.value};\n`; // Fallback
    }
  });
}
