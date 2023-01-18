"use strict";
/**
 * React Lazify — A VSCode extension to create lazy imports
 * Copyright (C) 2023  Justin Wallace
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const lazify_1 = require("./lazify");
function activate(context) {
    const imports = vscode.workspace
        .getConfiguration("lazify")
        .get("imports");
    let disposable = vscode.commands.registerCommand("react-lazify.lazify", () => (0, lazify_1.default)({ imports }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
    vscode.window.showInformationMessage("OK Bye!!");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map