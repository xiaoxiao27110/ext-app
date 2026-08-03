import assert from "node:assert/strict";
import { APPLICATION_CATALOG } from "../../src/applicationCatalog";

suite("ApplicationCatalog", () => {
  test("publishes OpenCode Web as the first release-controlled application", () => {
    assert.deepEqual(APPLICATION_CATALOG, [
      {
        description: "在独立浏览器标签中使用 OpenCode Web",
        runtimeEndpoint: {
          hostEnvironmentVariable: "CONTAINER_HOST",
          portEnvironmentVariable: "OPENCODE_WEB_PORT",
          scheme: "http"
        },
        iconPath: "media/opencode.svg",
        id: "opencode-web",
        name: "OpenCode Web"
      }
    ]);
  });
});
