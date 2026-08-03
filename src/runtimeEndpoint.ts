import { isIP } from "node:net";

export interface RuntimeEndpointDefinition {
  readonly hostEnvironmentVariable: string;
  readonly portEnvironmentVariable: string;
  readonly scheme: "http";
}

export interface ResolvedRuntimeEndpoint {
  readonly kind: "resolved";
  readonly runtimeEndpoint: string;
}

export interface DisabledRuntimeEndpoint {
  readonly kind: "disabled";
  readonly reason: string;
}

export type RuntimeEndpointResolution = ResolvedRuntimeEndpoint | DisabledRuntimeEndpoint;

export function resolveRuntimeEndpoint(
  definition: RuntimeEndpointDefinition,
  environment: Readonly<Record<string, string | undefined>>
): RuntimeEndpointResolution {
  const host = environment[definition.hostEnvironmentVariable];
  const port = environment[definition.portEnvironmentVariable];
  if (!host) {
    return {
      kind: "disabled",
      reason: `缺少环境变量 ${definition.hostEnvironmentVariable}`
    };
  }
  const runtimeHost = normalizeRuntimeHost(host);
  if (!runtimeHost) {
    return {
      kind: "disabled",
      reason: `环境变量 ${definition.hostEnvironmentVariable} 必须只包含主机名或 IP 地址`
    };
  }
  if (!port) {
    return {
      kind: "disabled",
      reason: `缺少环境变量 ${definition.portEnvironmentVariable}`
    };
  }
  const portNumber = Number(port);
  if (!/^\d+$/.test(port) || !Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
    return {
      kind: "disabled",
      reason: `环境变量 ${definition.portEnvironmentVariable} 必须是 1 到 65535 之间的整数`
    };
  }
  return {
    kind: "resolved",
    runtimeEndpoint: `${definition.scheme}://${runtimeHost}:${portNumber}/`
  };
}

function normalizeRuntimeHost(host: string): string | undefined {
  if (/[\s/@?#]/.test(host)) {
    return undefined;
  }

  if (host.startsWith("[") || host.endsWith("]")) {
    if (!(host.startsWith("[") && host.endsWith("]"))) {
      return undefined;
    }
    return isIP(host.slice(1, -1)) === 6 ? host : undefined;
  }

  if (host.includes(":")) {
    return isIP(host) === 6 ? `[${host}]` : undefined;
  }

  return host;
}
