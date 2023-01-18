"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../utils/functions");
const importUtilities_1 = require("../utils/importUtilities");
/**
 * @param line must be of type TextLine
 * @param useDefaultReactImport If true, will convert to React.lazy()
 * @param workspace If added, will add edits to the workspace, if not, will apply the edits directly.
 */
const convertLine = async (line, useDefaultReactImport = false, workspace) => {
    const editor = (0, functions_1.setEditor)();
    const text = line.text;
    const component = text.split(" ")[1];
    const path = (0, functions_1.getStringWithinQuotes)(text);
    const newLine = `const ${component} = ${useDefaultReactImport ? "React.lazy" : "lazy"}(() => import(${path}));`;
    if (component && path && text) {
        if (workspace) {
            workspace.replace(editor.document.uri, line.range, newLine);
        }
        else {
            const importName = useDefaultReactImport ? "React" : "lazy";
            await editor.edit(build => build.replace(line.range, newLine));
            await (0, importUtilities_1.addImport)(importName, "react", useDefaultReactImport ? "default" : "named");
        }
    }
    else {
        return (0, functions_1.noop)();
    }
};
exports.default = convertLine;
//# sourceMappingURL=convertLine.js.map