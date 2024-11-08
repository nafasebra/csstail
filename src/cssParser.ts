import * as vscode from "vscode";
import * as fs from "fs";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";
import postcss from "postcss";

async function loadTailwindConfig() {
  let userConfig = {};
  const configFiles = [
    "tailwind.config.js",
    "tailwind.config.cjs",
    "tailwind.config.mjs",
    "tailwind.config.ts",
  ];

  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
      const configPath = workspaceFolders[0].uri.fsPath;

      for (const configFile of configFiles) {
        const fullPath = `${configPath}/${configFile}`;
        if (fs.existsSync(fullPath)) {
          userConfig = await import(fullPath);
        }
      }
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      "Failed to load Tailwind configuration. it is using default tailwind config"
    );
    console.error(error);
  }

  return resolveConfig({ ...tailwindConfig, ...userConfig });
}

async function cssToTailwindClass(prop: string, value: string) {
  const tailwindConfig = await loadTailwindConfig();
  if (!tailwindConfig) {
    return null;
  }

  switch (prop) {
    case "color":
      if (tailwindConfig.theme.colors && value in tailwindConfig.theme.colors) {
        return `text-${value}`;
      }
      break;

    case "background-color":
      if (tailwindConfig.theme.colors && value in tailwindConfig.theme.colors) {
        return `bg-${value}`;
      }
      break;

    case "margin":
      if (
        tailwindConfig.theme.spacing &&
        value in tailwindConfig.theme.spacing
      ) {
        return `m-${value}`;
      }
      break;

    case "padding":
      if (
        tailwindConfig.theme.spacing &&
        value in tailwindConfig.theme.spacing
      ) {
        return `p-${value}`;
      }
      break;

    case "font-size":
      if (
        tailwindConfig.theme.fontSize &&
        value in tailwindConfig.theme.fontSize
      ) {
        return `text-${value}`;
      }
      break;

    // Additional mappings as needed...
    default:
      return null;
  }

  return null;
}

// Usage in your parse function
export async function initialConverting(cssCode: string) {
  const root = postcss.parse(cssCode);
  let result = "@apply ";

  root.walkDecls((decl) => {
    const tailwindClass = cssToTailwindClass(decl.prop, decl.value);
    if (tailwindClass) {
      result += `${tailwindClass} `;
    }
  });

  return result;
}
