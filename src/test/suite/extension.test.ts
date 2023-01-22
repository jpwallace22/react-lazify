import * as assert from "assert";
import * as vscode from "vscode";
import { beforeEach, describe, it, suite } from "mocha";
import convertLine from "../../lazify/convertLineToLazy";

const template = `
import React from 'react';
import SomeComponent from 'this/component/path';
import { SomeComponent } from 'this/component/path';
<SomeComponent this={jsx}>Make me Lazy!</SomeComponent>
`;

suite("Extension Test Suite", async () => {
  beforeEach(async () => {
    const document = await vscode.workspace.openTextDocument({
      content: template,
    });

    await vscode.window.showTextDocument(document);
  });

  describe("convertLine()", async () => {
    it("Should convert the line with lazy()", async () => {
      const editor = vscode.window.activeTextEditor;
      const line = editor?.document?.lineAt(
        new vscode.Position(2, 0)
      ) as vscode.TextLine;

      await convertLine(line, false);

      assert.strictEqual(
        editor?.document?.lineAt(new vscode.Position(2, 0)).text,
        "const SomeComponent = lazy(() => import('this/component/path'));"
      );
    });

    it("Should convert the line with React", async () => {
      const editor = vscode.window.activeTextEditor;
      const line = editor?.document?.lineAt(
        new vscode.Position(2, 0)
      ) as vscode.TextLine;

      await convertLine(line, true);

      assert.strictEqual(
        editor?.document?.lineAt(new vscode.Position(2, 0)).text,
        "const SomeComponent = React.lazy(() => import('this/component/path'));"
      );
    });
  });

  describe("lazify()", async () => {
    it("Should convert the selection and import", async () => {
      const editor = vscode.window.activeTextEditor;
      await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: 2,
      });

      await vscode.commands.executeCommand("react-lazify.lazify");

      setTimeout(async () => {
        assert.strictEqual(
          editor?.document.lineAt(new vscode.Position(2, 0)).text,
          "const SomeComponent = lazy(() => import('this/component/path'));"
        );
        assert.strictEqual(
          editor?.document.lineAt(new vscode.Position(1, 0)).text,
          "import React, { lazy } from 'react';"
        );
      }, 1);
    });

    it("Should convert the JSX selection and import", async () => {
      const editor = vscode.window.activeTextEditor;
      await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: 4,
      });

      await vscode.commands.executeCommand("react-lazify.lazify");

      setTimeout(async () => {
        assert.strictEqual(
          editor?.document.lineAt(new vscode.Position(2, 0)).text,
          "const SomeComponent = lazy(() => import('this/component/path'));"
        );
        assert.strictEqual(
          editor?.document.lineAt(new vscode.Position(1, 0)).text,
          "import React, { lazy } from 'react';"
        );
      }, 1);
    });
  });
});
