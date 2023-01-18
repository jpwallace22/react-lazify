"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const functions_1 = require("../utils/functions");
const importUtilities_1 = require("../utils/importUtilities");
const convertLine_1 = require("./convertLine");
const lazify = async ({ imports }) => {
    const editor = (0, functions_1.setEditor)();
    const workspace = new vscode.WorkspaceEdit();
    const selections = editor?.selections;
    // For each cursor on the document
    selections.forEach(async (selection) => {
        const start = selection.start.line;
        const end = selection.end.line;
        // Loop through entire selection from each cursor
        for (let i = start; i <= end; i++) {
            const line = editor.document.lineAt(i);
            // ensure the current line is a default import
            if (line.text.includes("{")) {
                vscode.window.showInformationMessage("React.lazy only works on default imports");
                continue;
            }
            // Add edits to a workspace
            line.text &&
                (await (0, convertLine_1.default)(line, imports?.useDefaultReactImport, workspace));
        }
        // Apply all edits and if success add import
        const convertSuccess = await vscode.workspace.applyEdit(workspace);
        convertSuccess &&
            (await (0, importUtilities_1.addImport)(imports?.useDefaultReactImport ? "React" : "lazy", "react", imports?.useDefaultReactImport ? "default" : "named"));
    });
};
exports.default = lazify;
//# sourceMappingURL=index.js.map