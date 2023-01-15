import * as vscode from "vscode";
import { getStringWithinQuotes, noop, setEditor } from "../utils/functions";
import { addNamedImport } from "../utils/importUtilities";

export interface IConfiguration {
  imports?: {
    useDefaultReactImport?: boolean;
  };
}

export default async ({ imports }: IConfiguration) => {
  const editor = setEditor();
  const selection = editor?.selection;
  const currentLine = editor.document.lineAt(selection.start);
  const ogText = currentLine.text;

  if (currentLine.text.includes("{")) {
    vscode.window.showInformationMessage(
      "React.lazy only works on default imports"
    );
    return noop;
  }

  const component = ogText.split(" ")[1];
  const path = getStringWithinQuotes(ogText);
  const newLine = `const ${component} = ${
    imports?.useDefaultReactImport ? "React.lazy" : "lazy"
  }(() => import(${path}));`;

  if (component && path) {
    await editor.edit(build => build.replace(currentLine.range, newLine));
    await addNamedImport("lazy", "react");
  } else {
    vscode.window.showInformationMessage(
      "Oops! You need to select an import statement"
    );
    return noop;
  }
};
