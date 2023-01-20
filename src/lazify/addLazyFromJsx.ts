import { IConfiguration } from ".";
import * as vscode from "vscode";
import { setEditor } from "../utils/functions";
import convertLineToLazy from "./convertLineToLazy";

const addLazyImportFromJsx = async (
  component: string,
  importConfig: IConfiguration["imports"],
  workspace?: vscode.WorkspaceEdit
) => {
  const editor = setEditor();
  const docText = editor.document.getText();
  const existingComp = docText.match(new RegExp(`import ${component}`));

  if (existingComp?.index) {
    const compLine = editor.document.positionAt(existingComp.index).line;
    await convertLineToLazy(
      editor.document.lineAt(compLine),
      importConfig?.useDefaultReactImport,
      workspace
    );
    vscode.window.showInformationMessage(
      `${component} converted to a lazy import 💤`
    );
  }
};

export default addLazyImportFromJsx;
