import * as vscode from "vscode";
import { setEditor } from "../utils/functions";
import { IConfiguration } from "./config";
import convertLineToLazy from "./convertLineToLazy";

const addLazyImportFromJsx = async (
  component: string,
  importConfig: IConfiguration["importConfig"],
  workspace?: vscode.WorkspaceEdit
) => {
  const editor = setEditor();
  const docText = editor.document.getText();
  const existingComp = docText.match(new RegExp(`import ${component}`));

  if (existingComp?.index !== undefined) {
    const compLine = editor.document.positionAt(existingComp.index).line;
    await convertLineToLazy(
      editor.document.lineAt(compLine),
      importConfig,
      workspace
    );
    vscode.window.showInformationMessage(
      `${component} converted to a lazy import 💤`
    );
  }
};

export default addLazyImportFromJsx;
