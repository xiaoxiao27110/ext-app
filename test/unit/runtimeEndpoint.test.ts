import assert from "node:assert/strict";
import { resolveRuntimeEndpoint } from "../../src/runtimeEndpoint";

suite("RuntimeEndpoint", () => {
  test("resolves the configured host and port to an HTTP runtime endpoint", () => {
    const result = resolveRuntimeEndpoint(
      {
        hostEnvironmentVariable: "CONTAINER_HOST",
        portEnvironmentVariable: "OPENCODE_WEB_PORT",
        scheme: "http"
      },
      {
        CONTAINER_HOST: "10.0.0.147",
        OPENCODE_WEB_PORT: "27111"
      }
    );

    assert.deepEqual(result, {
      kind: "resolved",
      runtimeEndpoint: "http://10.0.0.147:27111/"
    });
  });

  test("disables an application when the host environment variable is missing", () => {
    const result = resolveRuntimeEndpoint(
      {
        hostEnvironmentVariable: "CONTAINER_HOST",
        portEnvironmentVariable: "OPENCODE_WEB_PORT",
        scheme: "http"
      },
      { OPENCODE_WEB_PORT: "27111" }
    );

    assert.deepEqual(result, {
      kind: "disabled",
      reason: "缺少环境变量 CONTAINER_HOST"
    });
  });

  test("disables an application when the port environment variable is missing", () => {
    const result = resolveRuntimeEndpoint(
      {
        hostEnvironmentVariable: "CONTAINER_HOST",
        portEnvironmentVariable: "OPENCODE_WEB_PORT",
        scheme: "http"
      },
      { CONTAINER_HOST: "10.0.0.147" }
    );

    assert.deepEqual(result, {
      kind: "disabled",
      reason: "缺少环境变量 OPENCODE_WEB_PORT"
    });
  });

  test("disables an application when the configured port is not in the TCP port range", () => {
    for (const port of ["not-a-port", "0", "65536"]) {
      const result = resolveRuntimeEndpoint(
        {
          hostEnvironmentVariable: "CONTAINER_HOST",
          portEnvironmentVariable: "OPENCODE_WEB_PORT",
          scheme: "http"
        },
        {
          CONTAINER_HOST: "10.0.0.147",
          OPENCODE_WEB_PORT: port
        }
      );

      assert.deepEqual(result, {
        kind: "disabled",
        reason: "环境变量 OPENCODE_WEB_PORT 必须是 1 到 65535 之间的整数"
      });
    }
  });

  test("disables an application when the host contains URL syntax", () => {
    for (const host of ["http://10.0.0.147", "10.0.0.147/path", "user@10.0.0.147"]) {
      const result = resolveRuntimeEndpoint(
        {
          hostEnvironmentVariable: "CONTAINER_HOST",
          portEnvironmentVariable: "OPENCODE_WEB_PORT",
          scheme: "http"
        },
        {
          CONTAINER_HOST: host,
          OPENCODE_WEB_PORT: "27111"
        }
      );

      assert.deepEqual(result, {
        kind: "disabled",
        reason: "环境变量 CONTAINER_HOST 必须只包含主机名或 IP 地址"
      });
    }
  });

  test("brackets an IPv6 host when constructing the runtime endpoint", () => {
    const result = resolveRuntimeEndpoint(
      {
        hostEnvironmentVariable: "CONTAINER_HOST",
        portEnvironmentVariable: "OPENCODE_WEB_PORT",
        scheme: "http"
      },
      {
        CONTAINER_HOST: "2001:db8::1",
        OPENCODE_WEB_PORT: "27111"
      }
    );

    assert.deepEqual(result, {
      kind: "resolved",
      runtimeEndpoint: "http://[2001:db8::1]:27111/"
    });
  });
});
