import * as vscode from "vscode";
import { APPLICATION_CATALOG } from "./applicationCatalog";
import { ApplicationTreeProvider } from "./applicationTreeProvider";
import { LauncherExtension } from "./launcherExtension";

export function activate(context: vscode.ExtensionContext): void {
  const launcherExtension = new LauncherExtension(APPLICATION_CATALOG, process.env, (runtimeEndpoint) =>
    vscode.env.openExternal(vscode.Uri.parse(runtimeEndpoint))
  );
  const provider = new ApplicationTreeProvider(launcherExtension, context.extensionUri);
  const treeView = vscode.window.createTreeView("oneDeckApps.applications", {
    treeDataProvider: provider,
    showCollapseAll: false
  });

  context.subscriptions.push(
    treeView,
    vscode.commands.registerCommand("oneDeckApps.openApplication", async (applicationId: unknown) => {
      if (typeof applicationId !== "string") {
        await vscode.window.showWarningMessage("无法识别要打开的应用");
        return;
      }

      const result = await launcherExtension.open(applicationId);
      if (result.kind === "disabled" || result.kind === "not-found") {
        await vscode.window.showWarningMessage(result.reason);
      } else if (result.kind === "failed") {
        await vscode.window.showErrorMessage(result.reason);
      }
    })
  );

}

export function deactivate(): void {}
