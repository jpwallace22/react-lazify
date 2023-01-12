import * as vscode from "vscode";
import { getPathFromImport, setEditor } from "./utils/functions";

const convertSelected = async () => {
  const editor = setEditor();

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
};

const addLazyImport = () => {
  const editor = setEditor();

  const text = editor.document.getText();
  const regex = /import .*react.*/gi;
  const match = text.match(regex);

  const importPosition =
    match && editor.document.positionAt(text.search(match[0]));
  const line = editor.document.lineAt(
    importPosition || editor.document.positionAt(0)
  );
  const range = new vscode.Range(line.range.start, line.range.end);
};

const lazify = () => {
  convertSelected();
};

export default lazify;
