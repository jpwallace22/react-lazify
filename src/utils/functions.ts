import * as vscode from "vscode";

const getQuoteChar = (string: string) => {
  const quotes = ['"', "'", "`"];
  for (let i = 0; i < quotes.length; i++) {
    const quote = quotes[i];
    if (string.indexOf(quote) !== -1) {
      return quote;
    }
  }
};

/**
 * @param importString the full line of an `import` declaration
 * @returns path of import including the quotes
 */
export const getPathFromImport = (importString: string) => {
  const char = getQuoteChar(importString);
  if (!char) {
    vscode.window.showErrorMessage("Hmm, somethings seams to have gone wrong.");
    throw console.log(Error);
  }
  const start = importString.indexOf(char);
  const end = importString.indexOf(char, start + 1) + 1;
  return importString.substring(start, end);
};

/**
 *
 * @returns true or false depending on if react is imported on the current file (only works if `import` is present)
 */
export const isReactImported = () => {
  const editor = vscode.window.activeTextEditor;
  const text = editor?.document.getText();
  const regex = /import .*react.*/gi;

  return text?.match(regex);
};

export const setEditor = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage(
      "You need to have a file open to use this extension"
    );
    throw console.error(Error);
  }

  return editor;
};
