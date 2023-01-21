import * as assert from "assert";
import { before, describe, it, suite } from "mocha";

import * as vscode from "vscode";
import { setEditor, getQuoteChar } from "../../utils/functions";

suite("Misc Test Suite", () => {
  describe("getEditor()", () => {
    it("Should assign the vscode editor", () => {
      assert.doesNotThrow(setEditor);
    });

    it("Should throw an error", async () => {
      await vscode.commands.executeCommand("workbench.action.closeAllEditors");
      assert.throws(setEditor);
    });
  });

  describe("getQuotesChar()", () => {
    it("Should assign the correct quote", () => {
      assert.strictEqual(getQuoteChar('this is a " string'), '"');
      assert.strictEqual(getQuoteChar(`this is a ' string`), `'`);
      assert.strictEqual(getQuoteChar("this is a ` string"), "`");
    });

    it("Should return undefined", async () => {
      assert.equal(getQuoteChar("nothing"), undefined);
    });
  });
});
