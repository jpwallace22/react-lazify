import * as vscode from "vscode";
import { getStringWithinQuotes, noop, setEditor } from "../utils/functions";
import { addImport } from "../utils/importUtilities";

export const lazyImportString = (
  component: string,
  path: string,
  isDefaultImport: boolean = false
) =>
  `const ${component} = ${
    isDefaultImport ? "React.lazy" : "lazy"
  }(() => import(${path}));`;

/**
 * @param line must be of type TextLine
 * @param useDefaultReactImport If true, will convert to React.lazy()
 * @param workspace If added, will add edits to the workspace, if not, will apply the edits directly.
 */
const convertLineToLazy = async (
  line: vscode.TextLine,
  useDefaultReactImport: boolean = false,
  workspace?: vscode.WorkspaceEdit
) => {
  const editor = setEditor();
  const text = line.text;
  const component = text.split(" ")[1];
  const path = getStringWithinQuotes(text);

  if (component && path && text) {
    const newLine = lazyImportString(component, path, useDefaultReactImport);
    if (workspace) {
      workspace.replace(editor.document.uri, line.range, newLine);
    } else {
      const importName = useDefaultReactImport ? "React" : "lazy";
      await editor.edit(build => build.replace(line.range, newLine));
      await addImport(
        importName,
        "react",
        useDefaultReactImport ? "default" : "named"
      );
    }
  } else {
    return noop();
  }
};
export default convertLineToLazy;
