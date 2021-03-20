const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
  .build({
    entryPoints: ["src/action.ts"],
    bundle: true,
    platform: "node",
    target: "node12",
    sourcemap: "inline",
    outdir: "dist",
    plugins: [
      nodeExternalsPlugin({
        devDependencies: false,
      }),
    ],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
