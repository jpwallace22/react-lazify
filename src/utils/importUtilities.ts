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
      lineText.indexOf("}") - 1
    );
    if (currentModules.includes(module)) {
      return;
    }
    newLineText = lineText.replace(
      currentModules,
      `${currentModules}, ${module}`
    );
    await editor.edit(build => build.replace(line.range, newLineText));
  } else {
    const afterDefault = lineText.indexOf(" ", 7);
    newLineText =
      lineText.slice(0, afterDefault) +
      `, { ${module} }` +
      lineText.slice(afterDefault, lineText.length);

    await editor.edit(build => build.replace(line.range, newLineText));
  }
};

/**
 * If the import exists, the module name will be added to it, else it will create a new import at the top of the file
 * @param moduleName Name of the module or modules you want to import (multiple modules should be coma separated)
 * @param importLocation where the import is coming from
 */
export const addNamedImport = async (
  moduleName: string,
  importPath: string
) => {
  const editor = setEditor();
  const docText = editor.document.getText();
  const match = docText.match(new RegExp(`import .*${importPath}.*`));
  const importPosition = match
    ? editor.document.positionAt(docText.search(match[0]))
    : new vscode.Position(0, 0);
  if (match) {
    await addModuleToImport(moduleName, importPosition);
  } else {
    await editor.edit(build =>
      build.insert(
        editor.document.positionAt(0),
        `import { ${moduleName} } from '${importPath}';\n`
      )
    );
  }
};

/**
 * If the import exists, the name will be added in front of the modules, else it will create a new import at the top of the file
 * @param importName The name of the import to be added
 * @param importPath where the import is coming from
 */
export const addDefaultImport = async (
  importName: string,
  importPath: string
) => {
  const editor = setEditor();
  const docText = editor.document.getText();
  const match = docText.match(new RegExp(`import .*${importPath}.*`));
  const importPosition = match
    ? editor.document.positionAt(docText.search(match[0]))
    : new vscode.Position(0, 0);
  if (match) {
    const line = editor.document.lineAt(importPosition);
    if (line.text[7] === "{") {
      const newLine =
        line.text.slice(0, 7) +
        `${importName}, ` +
        line.text.slice(7, line.text.length);

      await editor.edit(build => build.replace(line.range, newLine));
    }
  } else {
    await editor.edit(build =>
      build.insert(
        importPosition,
        `import ${importName} from '${importPath}';\n`
      )
    );
  }
};

/**
 * If the import exists, the name/modules will be added to the existing, else it will create a new import at the top of the file
 * @param importName The name of the import (or modules) to be added. (multiple modules should be coma separated)
 * @param importPath where the import is coming from
 * @param type named or default. Modules are named imports
 */
export const addImport = async (
  importName: string,
  importPath: string,
  type: "named" | "default"
) => {
  type === "named"
    ? await addNamedImport(importName, importPath)
    : await addDefaultImport(importName, importPath);
};

/**
 * Takes the document text as returns the last line that starts with the word `import` as a vscode.TextLine
 * @param docText full document
 * @returns The last line that starts with the word 'import'
 */
export const getLastImportLine = (
  docText?: string
): vscode.TextLine | undefined => {
  if (!docText) {
    return;
  }
  const editor = setEditor();
  const lines = docText.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith("import")) {
      return editor.document.lineAt(i);
    }
  }
};
