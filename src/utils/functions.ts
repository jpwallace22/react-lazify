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
