import type { Stats } from "webpack";
import path from "path";
import { info, setFailed, setOutput } from "@actions/core";
const { exec } = require("child-process-promise");

async function run() {
  const packageJson = require(path.resolve(__dirname, "../package.json"));
  info("Installing Dependencies");
  await exec(
    `npm install ${Object.entries(packageJson.dependencies)
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(" ")} --no-save`
  );

  info("Resolving Configuration");
  const config = await require("./config").makeConfig();

  info("Building Container");
  const webpack = require("webpack");

  const stats = await new Promise<Stats>((resolve, reject) => {
    webpack(config, (err: Error, stats: Stats) => {
      if (err || stats.hasErrors()) {
        stats && info(stats.toString({ colors: true }));
        return reject(err || new Error("Build Failed"));
      }
      return resolve(stats);
    });
  });

  setOutput("path", stats.compilation.outputOptions.path);
  info(stats.toString({ colors: true }));
}

run().catch((err) => {
  setFailed(err);
});
