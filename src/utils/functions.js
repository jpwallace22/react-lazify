"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.setEditor = exports.getStringWithinQuotes = void 0;
const vscode = require("vscode");
/**
 * @param string any string with a ' " or `
 * @returns the quote that is used in the string
 */
const getQuoteChar = (string) => {
    const quotes = ['"', "'", "`"];
    for (let i = 0; i < quotes.length; i++) {
        const quote = quotes[i];
        if (string.indexOf(quote) !== -1) {
            return quote;
        }
    }
    return null;
};
/**
 * @param importString the full line of an `import` declaration
 * @returns path of import including the quotes
 */
const getStringWithinQuotes = (importString) => {
    const char = getQuoteChar(importString);
    if (char) {
        const start = importString.indexOf(char);
        const end = importString.indexOf(char, start + 1) + 1;
        return importString.substring(start, end);
    }
    return null;
};
exports.getStringWithinQuotes = getStringWithinQuotes;
/**
 * @returns Returns the `activeTextEditor` or throws an error if no text editor is open
 */
const setEditor = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("You need to have a file open to use this extension");
        throw console.error(Error("Editor not open"));
    }
    return editor;
};
exports.setEditor = setEditor;
const noop = () => { };
exports.noop = noop;
//# sourceMappingURL=functions.js.map