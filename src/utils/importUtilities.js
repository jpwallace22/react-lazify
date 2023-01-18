"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImport = exports.addDefaultImport = exports.addNamedImport = exports.addModuleToImport = void 0;
const vscode = require("vscode");
const functions_1 = require("./functions");
/**
 * @param module Name of the module to add
 * @param position Position of the current import line
 * @returns
 */
const addModuleToImport = async (module, position) => {
    const editor = (0, functions_1.setEditor)();
    const line = editor.document.lineAt(position);
    const lineText = line.text;
    let newLineText;
    if (lineText.includes("{")) {
        let currentModules = lineText.substring(lineText.indexOf("{") + 1, lineText.indexOf("}") - 1);
        if (currentModules.includes(module)) {
            return;
        }
        newLineText = lineText.replace(currentModules, `${currentModules}, ${module}`);
        await editor.edit(build => build.replace(line.range, newLineText));
    }
    else {
        const afterDefault = lineText.indexOf(" ", 7);
        newLineText =
            lineText.slice(0, afterDefault) +
                `, { ${module} }` +
                lineText.slice(afterDefault, lineText.length);
        await editor.edit(build => build.replace(line.range, newLineText));
    }
};
exports.addModuleToImport = addModuleToImport;
/**
 * @param moduleName Name of the module or modules you want to import (multiple modules should be coma separated)
 * @param importLocation where the import is coming from
 *
 * If the import exists, the module name will be added to it, else it will create a new import at the top of the file
 */
const addNamedImport = async (moduleName, importPath) => {
    const editor = (0, functions_1.setEditor)();
    const docText = editor.document.getText();
    const match = docText.match(new RegExp(`import .*${importPath}.*`));
    const importPosition = match
        ? editor.document.positionAt(docText.search(match[0]))
        : new vscode.Position(0, 0);
    if (match) {
        await (0, exports.addModuleToImport)(moduleName, importPosition);
    }
    else {
        await editor.edit(build => build.insert(editor.document.positionAt(0), `import { ${moduleName} } from '${importPath}';\n`));
    }
};
exports.addNamedImport = addNamedImport;
/**
 * @param importName The name of the import to be added
 * @param importPath where the import is coming from
 *
 * If the import exists, the name will be added in front of the modules, else it will create a new import at the top of the file
 */
const addDefaultImport = async (importName, importPath) => {
    const editor = (0, functions_1.setEditor)();
    const docText = editor.document.getText();
    const match = docText.match(new RegExp(`import .*${importPath}.*`));
    const importPosition = match
        ? editor.document.positionAt(docText.search(match[0]))
        : new vscode.Position(0, 0);
    if (match) {
        const line = editor.document.lineAt(importPosition);
        if (line.text[7] === "{") {
            const newLine = line.text.slice(0, 7) +
                `${importName}, ` +
                line.text.slice(7, line.text.length);
            await editor.edit(build => build.replace(line.range, newLine));
        }
    }
    else {
        await editor.edit(build => build.insert(importPosition, `import ${importName} from '${importPath}';\n`));
    }
};
exports.addDefaultImport = addDefaultImport;
/**
 * @param importName The name of the import (or modules) to be added. (multiple modules should be coma separated)
 * @param importPath where the import is coming from
 * @param type named or default. Modules are named imports
 *
 * If the import exists, the name/modules will be added to the existing, else it will create a new import at the top of the file
 */
const addImport = async (importName, importPath, type) => {
    type === "named"
        ? await (0, exports.addNamedImport)(importName, importPath)
        : await (0, exports.addDefaultImport)(importName, importPath);
};
exports.addImport = addImport;
//# sourceMappingURL=importUtilities.js.map