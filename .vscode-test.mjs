import { defineConfig } from "@vscode/test-cli";
import { tmpdir } from "node:os";
import { join } from "node:path";

const vscodeExecutablePath = process.env.VSCODE_EXECUTABLE_PATH;

export default defineConfig({
  files: "out-test/test/extension/**/*.test.js",
  launchArgs: [
    `--user-data-dir=${join(tmpdir(), `onedeck-apps-vscode-test-${process.pid}`)}`
  ],
  ...(vscodeExecutablePath
    ? { useInstallation: { fromPath: vscodeExecutablePath } }
    : { version: "1.121.0" }),
  workspaceFolder: "."
});
