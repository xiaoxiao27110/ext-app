# OneDeck Apps

This context describes the OneDeck extension that presents approved web applications inside VS Code while leaving application hosting and lifecycle management to the deployment environment.

## Language

**Application**:
An approved web experience presented to a OneDeck user with a stable identity, name, description, and icon.
_Avoid_: Site, bookmark, link

**Application Catalog**:
The release-controlled set of Applications available from the extension. Catalog membership and presentation change only with an extension release.
_Avoid_: Link list, user bookmarks

**Runtime Endpoint**:
The externally reachable address that the deployment environment assigns to an Application for a particular user container.
_Avoid_: Internal port, service process

**Launcher Extension**:
The VS Code extension that presents the Application Catalog and opens an Application's Runtime Endpoint.
_Avoid_: Portal, Agent platform, process manager

**Deployment Layer**:
The environment outside the Launcher Extension that runs Applications and makes their Runtime Endpoints available.
_Avoid_: Launcher Extension

**OpenCode Web**:
The first Application in the Application Catalog, providing OpenCode's browser interface for the user's container workspace.
_Avoid_: OpenCode TUI
