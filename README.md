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

The initial release constructs an HTTP endpoint from these values. If either value is missing or invalid, OpenCode Web remains visible in the catalog but is disabled with a configuration message.

## Status

The project is currently in design and initial setup.
