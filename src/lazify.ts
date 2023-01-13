import * as vscode from "vscode";
import { getStringWithinQuotes, setEditor } from "./utils/functions";
import { addNamedImport } from "./utils/importUtilities";

const convertSelected = async () => {
  const editor = setEditor();

  const selection = editor?.selection;
  const currentLine = editor.document.lineAt(selection.start);
  const ogText = currentLine.text;

  if (currentLine.text.includes("{")) {
    vscode.window.showInformationMessage(
      "React.lazy only works on default imports"
    );
    return null;
  }

  const component = ogText.split(" ")[1];
  const path = getStringWithinQuotes(ogText);

  const newLine = `const ${component} = lazy(() => import(${path}));`;
  if (component && path) {
    await editor.edit(build => build.replace(currentLine.range, newLine));
  } else {
    vscode.window.showInformationMessage(
      "Oops! You need to select an import statement"
    );
  }
};

const lazify = async () => {
  await convertSelected();
  await addNamedImport("lazy", "react");
};

export default lazify;
