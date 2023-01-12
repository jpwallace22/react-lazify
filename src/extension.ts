import * as vscode from "vscode";
import lazify from "./lazify";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "react-lazify.lazify",
    lazify
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  vscode.window.showInformationMessage("OK Bye!!");
}
