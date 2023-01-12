import * as vscode from "vscode";
import { getStringWithinQuotes, setEditor } from "./utils/functions";
import { addNamedImport } from "./utils/importUtilities";

const convertSelected = async () => {
  const editor = setEditor();

  const selection = editor?.selection;
  const currentLine = editor.document.lineAt(selection.start);
  const ogText = currentLine.text;

  const component = ogText.split(" ")[1];

  const newLine = `const ${component} = lazy(() => import(${getStringWithinQuotes(
    ogText
  )}));`;

  await editor.edit(build => build.replace(currentLine.range, newLine));
};

const lazify = async () => {
  await convertSelected();
  await addNamedImport("lazy", "react");
};

export default lazify;
