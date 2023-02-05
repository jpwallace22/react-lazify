import * as vscode from "vscode";
import { componentNameFromJsx, setEditor } from "../utils/functions";
import { addImport } from "../utils/importUtilities";
import addLazyImportFromJsx from "./addLazyFromJsx";
import { IConfiguration, lazyFrameworkInfo } from "./config";
import convertLineToLazy from "./convertLineToLazy";

const lazify = ({ importConfig }: IConfiguration) => {
  const editor = setEditor();
  const workspace = new vscode.WorkspaceEdit();
  const selections = editor?.selections;

  // For each cursor on the document
  selections.forEach(async selection => {
    const start = selection.start.line;
    const end = selection.end.line;

    // Loop through entire selection from each cursor
    for (let i = start; i <= end; i++) {
      const line = editor.document.lineAt(i);

      const jsxComponent = componentNameFromJsx(line);
      if (jsxComponent) {
        await addLazyImportFromJsx(jsxComponent, importConfig, workspace);
        continue;
      }

      if (line.text.includes("{")) {
        continue;
      }

      line.text && (await convertLineToLazy(line, importConfig, workspace));
    }

    // Apply all edits and if success add import
    const convertSuccess = await vscode.workspace.applyEdit(workspace);
    const { importName, importPath } = lazyFrameworkInfo(importConfig);
    convertSuccess &&
      (await addImport(
        importName,
        importPath,
        importName === "React" ? "default" : "named"
      ));
    return;
  });
};

export default lazify;
