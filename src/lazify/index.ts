import * as vscode from "vscode";
import { setEditor } from "../utils/functions";
import { addImport } from "../utils/importUtilities";
import convertLine from "./convertLine";

export interface IConfiguration {
  imports?: {
    useDefaultReactImport?: boolean;
  };
}

const lazify = async ({ imports }: IConfiguration) => {
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
      // ensure the current line is a default import
      if (line.text.includes("{")) {
        vscode.window.showInformationMessage(
          "React.lazy only works on default imports"
        );
        continue;
      }

      // Add edits to a workspace
      await convertLine(line, imports?.useDefaultReactImport, workspace);
    }

    // Apply all edits and if success add import
    const convertSuccess = await vscode.workspace.applyEdit(workspace);
    convertSuccess &&
      (await addImport(
        imports?.useDefaultReactImport ? "React" : "lazy",
        "react",
        imports?.useDefaultReactImport ? "default" : "named"
      ));
  });
};

export default lazify;
