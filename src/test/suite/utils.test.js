"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const vscode = require("vscode");
const utils = require("../../utils/importUtilities");
(0, mocha_1.suite)("Utils Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");
    (0, mocha_1.beforeEach)(async () => {
        const document = await vscode.workspace.openTextDocument({
            content: "import { Fake } from 'place';\nimport Fake from 'react';\n",
        });
        await vscode.window.showTextDocument(document);
    });
    (0, mocha_1.describe)("addModuleToImport()", async () => {
        (0, mocha_1.it)("should insert module into {}", async () => {
            const editor = vscode.window.activeTextEditor;
            const start = new vscode.Position(0, 0);
            await utils.addModuleToImport("Test", start);
            // Should not duplicate
            await utils.addModuleToImport("Test", start);
            assert.strictEqual(editor?.document.lineAt(start.line).text, "import { Fake, Test } from 'place';");
        });
        (0, mocha_1.it)("should add module after default import", async () => {
            const editor = vscode.window.activeTextEditor;
            const start = new vscode.Position(1, 0);
            await utils.addModuleToImport("Test", start);
            assert.strictEqual(editor?.document.lineAt(start.line).text, "import Fake, { Test } from 'react';");
        });
    });
    (0, mocha_1.describe)("addNamedImport()", async () => {
        (0, mocha_1.it)("Should add new named import at the top of the file", async () => {
            const editor = vscode.window.activeTextEditor;
            await utils.addNamedImport("Test", "@test-package");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(0, 0)).text, "import { Test } from '@test-package';");
        });
        (0, mocha_1.it)("Should find and add module after default import", async () => {
            const editor = vscode.window.activeTextEditor;
            await utils.addNamedImport("Test", "react");
            // Should not duplicate
            await utils.addNamedImport("Test", "react");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(1, 0)).text, "import Fake, { Test } from 'react';");
        });
    });
    (0, mocha_1.describe)("addDefaultImport()", async () => {
        (0, mocha_1.it)("Should add new default import at the top of the file", async () => {
            const editor = vscode.window.activeTextEditor;
            await utils.addDefaultImport("Test", "@test-package");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(0, 0)).text, "import Test from '@test-package';");
        });
        (0, mocha_1.it)("Should find and add default import before modules", async () => {
            const editor = vscode.window.activeTextEditor;
            await utils.addDefaultImport("Test", "place");
            // Should not duplicate
            await utils.addDefaultImport("Test", "place");
            assert.strictEqual(editor?.document.lineAt(new vscode.Position(0, 0)).text, "import Test, { Fake } from 'place';");
        });
    });
});
//# sourceMappingURL=utils.test.js.map