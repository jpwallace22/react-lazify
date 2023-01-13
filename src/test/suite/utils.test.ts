import * as assert from "assert";
import { before, describe, it, suite } from "mocha";

import * as vscode from "vscode";
import * as utils from "../../utils/importUtilities";

suite("Utils Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  before(async () => {
    const document = await vscode.workspace.openTextDocument({
      content:
        "{ Fake, Modules }\nimport Fake from 'place';\nimport { Fake } from 'react';",
    });
    await vscode.window.showTextDocument(document);
  });

  describe("addModuleToImport", async () => {
    it("should insert module into {}", async () => {
      const editor = vscode.window.activeTextEditor;
      const start = new vscode.Position(0, 0);
      await utils.addModuleToImport("Test", start);
      // Ran twice to ensure it doesn't duplicate
      await utils.addModuleToImport("Test", start);

      assert.strictEqual(
        editor?.document.lineAt(start.line).text,
        "{ Fake, Modules, Test }"
      );
    });

    it("should add module after default import", async () => {
      const editor = vscode.window.activeTextEditor;
      const start = new vscode.Position(1, 0);
      await utils.addModuleToImport("Test", start);

      assert.strictEqual(
        editor?.document.lineAt(start.line).text,
        "import Fake, { Test } from 'place';"
      );
    });
  });

  describe("addNamedImport", async () => {
    it("should add new named import at the top of the file", async () => {
      const editor = vscode.window.activeTextEditor;
      await utils.addNamedImport("Test", "@test-package");

      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(0, 0)).text,
        "import { Test } from '@test-package';"
      );
    });
  });
});
