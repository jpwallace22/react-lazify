import * as vscode from "vscode";

/**
 * @param string any string with a ' " or `
 * @returns the quote that is used in the string
 */
const getQuoteChar = (string: string) => {
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
export const getStringWithinQuotes = (importString: string) => {
  const char = getQuoteChar(importString);
  if (char) {
    const start = importString.indexOf(char);
    const end = importString.indexOf(char, start + 1) + 1;
    return importString.substring(start, end);
  }
  return null;
};

/**
 * @returns Returns the `activeTextEditor` or throws an error if no text editor is open
 */
export const setEditor = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage(
      "You need to have a file open to use this extension"
    );
    throw console.error(Error("Editor not open"));
  }

  return editor;
};
