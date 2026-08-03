import assert from "node:assert/strict";
import * as vscode from "vscode";

suite("OneDeck Apps extension", () => {
  test("is discovered and activates in the extension host", async () => {
    const extension = vscode.extensions.getExtension("xiaoxiao27110.onedeck-apps");

    assert.ok(extension, "extension should be installed in the test host");
    await extension.activate();
    assert.equal(extension.isActive, true);
  });
});
