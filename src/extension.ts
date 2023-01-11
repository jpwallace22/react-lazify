import * as vscode from "vscode";
import { getPathFromImport } from "./utils/functions";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "react-lazify.lazify",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage(
          "You need to have a file open to use this extension"
        );
        return;
      }
      const selection = editor?.selection;
      const currentLine = editor.document.lineAt(selection.start);
      const ogText = currentLine.text;

      const component = ogText.split(" ")[1];

      const newLine = `const ${component} = lazy(() => import(${getPathFromImport(
        ogText
      )}));`;

      let workspaceEdit = new vscode.WorkspaceEdit();
      workspaceEdit.replace(editor.document.uri, currentLine.range, newLine);
      await vscode.workspace.applyEdit(workspaceEdit);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
  vscode.window.showInformationMessage("OK Bye!!");
}
