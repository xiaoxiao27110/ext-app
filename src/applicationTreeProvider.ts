import * as vscode from "vscode";
import type { ApplicationListItem, LauncherExtension } from "./launcherExtension";

export class ApplicationTreeProvider implements vscode.TreeDataProvider<ApplicationListItem> {
  constructor(
    private readonly launcherExtension: LauncherExtension,
    private readonly extensionUri: vscode.Uri
  ) {}

  getChildren(): ApplicationListItem[] {
    return [...this.launcherExtension.list()];
  }

  getTreeItem(application: ApplicationListItem): vscode.TreeItem {
    const item = new vscode.TreeItem(application.name, vscode.TreeItemCollapsibleState.None);
    item.id = application.id;
    item.description = application.enabled
      ? application.description
      : `${application.description} · 未配置`;
    item.iconPath = vscode.Uri.joinPath(this.extensionUri, application.iconPath);
    item.contextValue = application.enabled
      ? "oneDeckApps.application.enabled"
      : "oneDeckApps.application.disabled";
    item.tooltip = applicationTooltip(application);
    item.accessibilityInformation = {
      role: application.enabled ? "button" : "treeitem",
      label: application.enabled
        ? `${application.name}，点击在浏览器中打开`
        : `${application.name}，已禁用，${application.disabledReason}`
    };
    if (application.enabled) {
      item.command = {
        command: "oneDeckApps.openApplication",
        title: `打开 ${application.name}`,
        arguments: [application.id]
      };
    }
    return item;
  }
}

function applicationTooltip(application: ApplicationListItem): vscode.MarkdownString {
  const tooltip = new vscode.MarkdownString();
  tooltip.isTrusted = false;
  tooltip.supportHtml = false;
  tooltip.appendText(application.name);
  tooltip.appendMarkdown("\n\n");
  tooltip.appendText(application.description);
  tooltip.appendMarkdown("\n\n");
  if (application.enabled) {
    tooltip.appendText(application.runtimeEndpoint);
  } else {
    tooltip.appendText(application.disabledReason);
  }
  return tooltip;
}
