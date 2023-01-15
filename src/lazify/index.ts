import * as vscode from "vscode";
import { getStringWithinQuotes, noop, setEditor } from "../utils/functions";
import { addImport, addNamedImport } from "../utils/importUtilities";

export interface IConfiguration {
  imports?: {
    useDefaultReactImport?: boolean;
  };
}

const convertLine = async (
  text: string,
  line: vscode.TextLine,
  useDefaultReactImport: boolean = false
) => {
  const editor = setEditor();
  const component = text.split(" ")[1];
  const path = getStringWithinQuotes(text);
  const newLine = `const ${component} = ${
    useDefaultReactImport ? "React.lazy" : "lazy"
  }(() => import(${path}));`;

  if (component && path) {
    const importName = useDefaultReactImport ? "React" : "lazy";

    await editor.edit(build => build.replace(line.range, newLine));
    await addImport(
      importName,
      "react",
      useDefaultReactImport ? "default" : "named"
    );
  } else {
    return noop;
  }
};

const lazify = async ({ imports }: IConfiguration) => {
  const editor = setEditor();
  const selection = editor?.selection;
  const start = selection.start.line;
  const end = selection.end.line;

  for (let i = start; i <= end; i++) {
    const line = editor.document.lineAt(i);
    const ogText = line.text;
    if (line.text.includes("{")) {
      vscode.window.showInformationMessage(
        "React.lazy only works on default imports"
      );
      continue;
    }
    await convertLine(ogText, line, imports?.useDefaultReactImport);
  }
};

export default lazify;
