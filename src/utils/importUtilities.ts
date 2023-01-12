import * as vscode from "vscode";
import { setEditor } from "./functions";

/**
 * @param module Name of the module to add
 * @param position Position of the current import line
 * @returns
 */
export const addModuleToImport = async (
  module: string,
  position: vscode.Position
) => {
  const editor = setEditor();
  const line = editor.document.lineAt(position);
  const lineText = line.text;
  let newLineText: string;
  if (lineText.includes("{")) {
    let currentModules = lineText.substring(
      lineText.indexOf("{") + 1,
      lineText.indexOf("}")
    );
    if (currentModules.includes(module)) {
      return;
    }
    newLineText = lineText.replace(
      currentModules,
      `${currentModules}, ${module} `
    );
    await editor.edit(build => build.replace(line.range, newLineText));
  } else {
    const afterDefault = lineText.indexOf(" ", 7);
    newLineText =
      lineText.slice(0, afterDefault) +
      `, { ${module} }` +
      lineText.slice(afterDefault, -1);

    await editor.edit(build => build.replace(line.range, newLineText));
  }
};

/**
 * @param moduleName Name of the module or modules you want to import
 * @param importLocation where the import is coming from
 *
 * If the import exists, the module name will be added to it, else it will create a new import at the top of the file
 */
export const addNamedImport = async (
  moduleName: string,
  importLocation: string
) => {
  const editor = setEditor();
  const text = editor.document.getText();
  const regex = new RegExp(`import .*${importLocation}.*`);
  const match = text.match(regex);
  let importPosition: vscode.Position;
  if (match) {
    importPosition = editor.document.positionAt(text.search(match[0]));
    addModuleToImport(moduleName, importPosition);
  } else {
    await editor.edit(build =>
      build.insert(
        editor.document.positionAt(0),
        `import { ${moduleName} } from '${importLocation}';\n`
      )
    );
  }
};
