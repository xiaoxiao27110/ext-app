import type { RuntimeEndpointDefinition } from "./runtimeEndpoint";

export interface ApplicationDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly iconPath: string;
  readonly runtimeEndpoint: RuntimeEndpointDefinition;
}

export const APPLICATION_CATALOG: readonly ApplicationDefinition[] = [
  {
    id: "opencode-web",
    name: "OpenCode Web",
    description: "在独立浏览器标签中使用 OpenCode Web",
    iconPath: "media/opencode.svg",
    runtimeEndpoint: {
      scheme: "http",
      hostEnvironmentVariable: "CONTAINER_HOST",
      portEnvironmentVariable: "OPENCODE_WEB_PORT"
    }
  }
];
