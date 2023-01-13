import * as assert from "assert";
import * as vscode from "vscode";
import { beforeEach, describe, it, suite } from "mocha";

suite("Extension Test Suite", () => {
  describe("Lazify", async () => {
    beforeEach(async () => {
      const document = await vscode.workspace.openTextDocument({
        content:
          "import React from 'react';\nimport SomeComponent from 'this/component/path';\n\nimport { SomeComponent } from 'this/component/path';\n",
      });
      await vscode.window.showTextDocument(document);
    });

    it("Should convert the selection and import", async () => {
      const editor = vscode.window.activeTextEditor;
      await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: 1,
      });
      await vscode.commands.executeCommand("react-lazify.lazify");

      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(1, 0)).text,
        "const SomeComponent = lazy(() => import('this/component/path'));"
      );
      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(0, 0)).text,
        "import React, { lazy } from 'react';"
      );
    });

    it("Should NOT attempt to convert the blank line", async () => {
      const editor = vscode.window.activeTextEditor;
      await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: 2,
      });
      await vscode.commands.executeCommand("react-lazify.lazify");

      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(1, 0)).text,
        "import SomeComponent from 'this/component/path';"
      );
      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(0, 0)).text,
        "import React from 'react';"
      );
    });

    it("Should NOT convert the named import", async () => {
      const editor = vscode.window.activeTextEditor;
      await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: 3,
      });
      await vscode.commands.executeCommand("react-lazify.lazify");

      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(0, 0)).text,
        "import React from 'react';"
      );
      assert.strictEqual(
        editor?.document.lineAt(new vscode.Position(3, 0)).text,
        "import { SomeComponent } from 'this/component/path';"
      );
    });
  });
});
