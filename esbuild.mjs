import * as esbuild from "esbuild";

const production = process.argv.includes("--production");

await esbuild.build({
  entryPoints: ["src/extension.ts"],
  bundle: true,
  external: ["vscode"],
  format: "cjs",
  minify: production,
  outfile: "dist/extension.js",
  platform: "node",
  sourcemap: true,
  target: "node20"
});
