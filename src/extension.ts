import * as vscode from "vscode";
import { initialConverting } from "./cssParser";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.converttotailwind",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const selection = editor.selection;

      // Get the selected CSS code
      const cssCode = document.getText(selection);

      // Convert CSS to Tailwind CSS
      const tailwindCode = initialConverting(cssCode);

      // Replace the selection with the converted Tailwind code
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, "@apply" + tailwindCode + ";");
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
