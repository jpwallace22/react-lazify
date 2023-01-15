import * as assert from "assert";
import { beforeEach, describe, it, suite } from "mocha";

import * as vscode from "vscode";
import * as utils from "../../utils/importUtilities";

suite("Utils Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  beforeEach(async () => {
    const document = await vscode.workspace.openTextDocument({
      content: "import { Fake } from 'place';\nimport Fake from 'react';\n",
    });
    await vscode.window.showTextDocument(document);
  });

  describe("addModuleToImport(module, position)", async () => {
    it("should insert module into {}", async () => {
      const editor = vscode.window.activeTextEditor;
      const start = new vscode.Position(0, 0);
      await utils.addModuleToImport("Test", start);
      // Ran twice to ensure it doesn't duplicate
      await utils.addModuleToImport("Test", start);

      assert.strictEqual(
        editor?.document.lineAt(start.line).text,
        "import { Fake, Test } from 'place';"
      );
    });

    it("should add module after default import", async () => {
      const editor = vscode.window.activeTextEditor;
      const start = new vscode.Position(1, 0);
      await utils.addModuleToImport("Test", start);

      assert.strictEqual(
        editor?.document.lineAt(start.line).text,
        "import Fake, { Test } from 'react';"
      );
    });
  });

  describe("addNamedImport(module, importPath)", async () => {
    it("Should add new named import at the top of the file", async () => {
      const editor = vscode.window.activeTextEditor;
      await utils.addNamedImport("Test", "@test-package");

      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(0, 0)).text,
        "import { Test } from '@test-package';"
      );
    });

    it("Should find and add module after default import", async () => {
      const editor = vscode.window.activeTextEditor;
      await utils.addNamedImport("Test", "react");

      setTimeout(() => {
        assert.strictEqual(
          editor?.document.lineAt(new vscode.Position(1, 0)).text,
          "import Fake, { Test } from 'react';"
        );
      }, 1);
    });
  });
});
