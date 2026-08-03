import type { ApplicationDefinition } from "./applicationCatalog";
import { resolveRuntimeEndpoint } from "./runtimeEndpoint";

export type BrowserOpener = (runtimeEndpoint: string) => PromiseLike<boolean>;

export type OpenApplicationResult =
  | { readonly kind: "opened"; readonly runtimeEndpoint: string }
  | { readonly kind: "disabled"; readonly reason: string }
  | { readonly kind: "not-found"; readonly reason: string }
  | { readonly kind: "failed"; readonly reason: string };

type ApplicationPresentation = Pick<
  ApplicationDefinition,
  "id" | "name" | "description" | "iconPath"
>;

export type ApplicationListItem = ApplicationPresentation &
  (
    | { readonly enabled: true; readonly runtimeEndpoint: string }
    | { readonly enabled: false; readonly disabledReason: string }
  );

export class LauncherExtension {
  constructor(
    private readonly catalog: readonly ApplicationDefinition[],
    private readonly environment: Readonly<Record<string, string | undefined>>,
    private readonly browserOpener: BrowserOpener
  ) {}

  list(): readonly ApplicationListItem[] {
    return this.catalog.map((application) => {
      const runtimeEndpoint = resolveRuntimeEndpoint(application.runtimeEndpoint, this.environment);
      const item = {
        id: application.id,
        name: application.name,
        description: application.description,
        iconPath: application.iconPath
      };
      return runtimeEndpoint.kind === "resolved"
        ? {
            ...item,
            enabled: true as const,
            runtimeEndpoint: runtimeEndpoint.runtimeEndpoint
          }
        : { ...item, enabled: false as const, disabledReason: runtimeEndpoint.reason };
    });
  }

  async open(applicationId: string): Promise<OpenApplicationResult> {
    const application = this.catalog.find(({ id }) => id === applicationId);
    if (!application) {
      return {
        kind: "not-found",
        reason: `未找到应用 ${applicationId}`
      };
    }

    const runtimeEndpoint = resolveRuntimeEndpoint(application.runtimeEndpoint, this.environment);
    if (runtimeEndpoint.kind === "disabled") {
      return runtimeEndpoint;
    }

    if (!(await this.browserOpener(runtimeEndpoint.runtimeEndpoint))) {
      return {
        kind: "failed",
        reason: `无法打开 ${application.name}`
      };
    }

    return {
      kind: "opened",
      runtimeEndpoint: runtimeEndpoint.runtimeEndpoint
    };
  }
}
