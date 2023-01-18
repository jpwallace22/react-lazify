"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
const mocha_1 = require("mocha");
const convertLine_1 = require("../../lazify/convertLine");
const template = `
import React from 'react';
import SomeComponent from 'this/component/path';
import { SomeComponent } from 'this/component/path';
`;
(0, mocha_1.suite)("Extension Test Suite", async () => {
    (0, mocha_1.beforeEach)(async () => {
        const document = await vscode.workspace.openTextDocument({
            content: template,
        });
        await vscode.window.showTextDocument(document);
    });
    (0, mocha_1.describe)("convertLine()", async () => {
        (0, mocha_1.it)("Should convert the line with lazy()", async () => {
            const editor = vscode.window.activeTextEditor;
            const line = editor?.document?.lineAt(new vscode.Position(2, 0));
            await (0, convertLine_1.default)(line, false);
            assert.strictEqual(editor?.document?.lineAt(new vscode.Position(2, 0)).text, "const SomeComponent = lazy(() => import('this/component/path'));");
        });
        (0, mocha_1.it)("Should convert the line with React", async () => {
            const editor = vscode.window.activeTextEditor;
            const line = editor?.document?.lineAt(new vscode.Position(2, 0));
            await (0, convertLine_1.default)(line, true);
            assert.strictEqual(editor?.document?.lineAt(new vscode.Position(2, 0)).text, "const SomeComponent = React.lazy(() => import('this/component/path'));");
        });
    });
    (0, mocha_1.describe)("lazify()", async () => {
        (0, mocha_1.it)("Should convert the selection and import", async () => {
            const editor = vscode.window.activeTextEditor;
            await vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: 1,
            });
            await vscode.commands.executeCommand("react-lazify.lazify");
            setTimeout(async () => {
                assert.strictEqual(editor?.document.lineAt(new vscode.Position(2, 0)).text, "const SomeComponent = lazy(() => import('this/component/path'));");
                assert.strictEqual(editor?.document.lineAt(new vscode.Position(1, 0)).text, "import React, { lazy } from 'react';");
            }, 1);
        });
        (0, mocha_1.it)("Should convert the selection and import as default", async () => {
            const editor = vscode.window.activeTextEditor;
            await vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: 1,
            });
            const settings = vscode.workspace.getConfiguration("lazify");
            await settings.update("imports.useDefaultReactImport", true, true);
            setTimeout(async () => {
                await vscode.commands.executeCommand("react-lazify.lazify");
                await settings.update("imports.useDefaultReactImport", false, true);
                assert.strictEqual(editor?.document.lineAt(new vscode.Position(1, 0)).text, "const SomeComponent = React.lazy(() => import('this/component/path'));");
                assert.strictEqual(editor?.document.lineAt(new vscode.Position(0, 0)).text, "import React from 'react';");
            }, 1);
        });
        (0, mocha_1.it)("Should NOT attempt to convert the blank line", async () => {
            const editor = vscode.window.activeTextEditor;
            await vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: 2,
            });
            await vscode.commands.executeCommand("react-lazify.lazify");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(2, 0)).text, "import SomeComponent from 'this/component/path';");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(1, 0)).text, "import React from 'react';");
        });
        (0, mocha_1.it)("Should NOT convert the named import", async () => {
            const editor = vscode.window.activeTextEditor;
            await vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: 3,
            });
            await vscode.commands.executeCommand("react-lazify.lazify");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(1, 0)).text, "import React from 'react';");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(3, 0)).text, "import { SomeComponent } from 'this/component/path';");
        });
    });
});
//# sourceMappingURL=extension.test.js.map