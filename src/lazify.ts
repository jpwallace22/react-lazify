import * as vscode from "vscode";
import { getPathFromImport } from "./utils/functions";

const lazify = async (selection: vscode.Selection) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage(
      "You need to have a file open to use this extension"
    );
    return;
  }
  const currentLine = editor.document.lineAt(selection.start);
  const ogText = currentLine.text;

  const component = ogText.split(" ")[1];

  const newLine = `const ${component} = lazy(() => import(${getPathFromImport(
    ogText
  )}));`;

  let workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.replace(editor.document.uri, currentLine.range, newLine);
  await vscode.workspace.applyEdit(workspaceEdit);
};

export default lazify;
