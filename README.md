# ext-app

`ext-app` is a VS Code application launcher for OneDeck. It presents a release-controlled catalog of approved web applications in the Activity Bar and opens each application in a separate browser tab.

The first catalog entry is OpenCode Web.

## Responsibility

The extension owns:

- application names, descriptions, ordering, and bundled icons;
- configuration validation;
- the VS Code Activity Bar application list;
- opening configured applications in the user's browser.

The extension does not start, stop, supervise, restart, authenticate, or expose application processes. Those responsibilities belong to the deployment environment.

## OpenCode Web deployment interface

The workspace extension host requires these environment variables:

- `CONTAINER_HOST`: externally reachable Docker host name or IP address;
- `OPENCODE_WEB_PORT`: host port mapped to the container's OpenCode Web port.

The initial release constructs an HTTP Runtime Endpoint from these values. If either value is missing or invalid, OpenCode Web remains visible in the Application Catalog but is disabled with a configuration message.

The extension validates configuration only. It does not poll or otherwise test whether OpenCode Web is currently online.

## Development

Requirements:

- Node.js and npm;
- VS Code 1.121 or later.

Common commands:

```bash
npm install
npm run check
npm run build
npm run test:unit
npm run test:extension
npm test
npm run package
```

`npm run test:extension` downloads VS Code 1.121 by default. To reuse an existing VS Code installation, set `VSCODE_EXECUTABLE_PATH` to its executable before running the command.

The packaged artifact is `onedeck-apps.vsix`.

## Status

The Launcher Extension includes OpenCode Web in its Application Catalog.
