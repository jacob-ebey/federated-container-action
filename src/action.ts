import type { Configuration, Stats } from "webpack";
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
  const config: Configuration[] = await require("./config").makeConfig();

  info("Building Container");
  const webpack = require("webpack");

  const runBuild = async (config: Configuration, idx: number) => {
    const stats = await new Promise<Stats>((resolve, reject) => {
      webpack(config, (err: Error, stats: Stats) => {
        if (err || stats.hasErrors()) {
          stats && info(stats.toString({ colors: true }) + "\n\n");
          return reject(err || new Error("Build Failed"));
        }
        return resolve(stats);
      });
    });

    setOutput(`path${idx}`, stats.compilation.outputOptions.path);
    info(stats.toString({ colors: true }));
  };

  await Promise.all(config.map((cfg, idx) => runBuild(cfg, idx)));
}

run().catch((err) => {
  setFailed(err);
});
