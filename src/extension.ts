/**
 * React Lazify — A VSCode extension to create lazy imports
 * Copyright (C) 2023  Justin Wallace
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
