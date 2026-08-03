import assert from "node:assert/strict";
import { APPLICATION_CATALOG } from "../../src/applicationCatalog";
import { LauncherExtension } from "../../src/launcherExtension";

suite("LauncherExtension", () => {
  test("opens a configured application through the browser opener", async () => {
    const openedRuntimeEndpoints: string[] = [];
    const launcherExtension = new LauncherExtension(
      APPLICATION_CATALOG,
      {
        CONTAINER_HOST: "10.0.0.147",
        OPENCODE_WEB_PORT: "27111"
      },
      async (runtimeEndpoint) => {
        openedRuntimeEndpoints.push(runtimeEndpoint);
        return true;
      }
    );

    const result = await launcherExtension.open("opencode-web");

    assert.deepEqual(result, {
      kind: "opened",
      runtimeEndpoint: "http://10.0.0.147:27111/"
    });
    assert.deepEqual(openedRuntimeEndpoints, ["http://10.0.0.147:27111/"]);
  });

  test("keeps an unconfigured application visible but refuses to open it", async () => {
    let openCount = 0;
    const launcherExtension = new LauncherExtension(
      APPLICATION_CATALOG,
      { OPENCODE_WEB_PORT: "27111" },
      async () => {
        openCount += 1;
        return true;
      }
    );

    assert.deepEqual(launcherExtension.list(), [
      {
        description: "在独立浏览器标签中使用 OpenCode Web",
        disabledReason: "缺少环境变量 CONTAINER_HOST",
        enabled: false,
        iconPath: "media/opencode.svg",
        id: "opencode-web",
        name: "OpenCode Web"
      }
    ]);
    assert.deepEqual(await launcherExtension.open("opencode-web"), {
      kind: "disabled",
      reason: "缺少环境变量 CONTAINER_HOST"
    });
    assert.equal(openCount, 0);
  });
});
