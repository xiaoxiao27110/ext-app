# Keep application lifecycle outside the extension

The Launcher Extension only presents the Application Catalog and opens Runtime Endpoints. Starting, supervising, retrying, logging, and exposing applications remain responsibilities of the Deployment Layer because a VS Code extension host can reload or stop independently and is not a reliable process supervisor.
