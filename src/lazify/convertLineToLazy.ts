import * as vscode from "vscode";
import { getStringWithinQuotes, setEditor } from "../utils/functions";
import { addImport } from "../utils/importUtilities";
import { IConfiguration, lazyFrameworkInfo } from "./config";

export const lazyImportString = (
  component: string,
  path: string,
  importConfig: IConfiguration["importConfig"]
) =>
  `const ${component} = ${
    lazyFrameworkInfo(importConfig)?.functionName
  }(() => import(${path}));`;

/**
 * @param line must be of type TextLine
 * @param useDefaultReactImport If true, will convert to React.lazy()
 * @param workspace If added, will add edits to the workspace, if not, will apply the edits directly.
 */
const convertLineToLazy = async (
  line: vscode.TextLine,
  importConfig: IConfiguration["importConfig"],
  workspace?: vscode.WorkspaceEdit
) => {
  const editor = setEditor();
  const text = line.text;
  const component = text.split(" ")[1];
  const path = getStringWithinQuotes(text);

  if (component && path && text) {
    const newLine = lazyImportString(component, path, importConfig);
    if (workspace) {
      workspace.replace(editor.document.uri, line.range, newLine);
    } else {
      const { importName, importPath } = lazyFrameworkInfo(importConfig);
      await editor.edit(build => build.replace(line.range, newLine));
      await addImport(
        importName,
        importPath,
        importName === "React" ? "default" : "named"
      );
    }
  }
};
export default convertLineToLazy;
