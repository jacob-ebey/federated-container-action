import path from "path";

import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { getInput, setFailed, warning } from "@actions/core";

async function loadExposes() {
  const exposesInput = getInput("exposes") || "./exposes.js";

  const exposesPath = path.resolve(exposesInput);

  const exposesModule = require(exposesPath);
  return [
    await (typeof exposesModule === "function"
      ? exposesModule()
      : exposesModule),
    path.dirname(exposesPath),
  ];
}

export async function makeConfig(): Promise<Configuration> {
  /** @type {import("webpack")} */
  const webpack = require("webpack");

  const [exposes, context] = await loadExposes();
  const configInput = getInput("config") || "./webpack.config.js";
  const configPath = path.resolve(configInput);
  let userConfig = {};
  try {
    userConfig = require(configPath);
  } catch (err) {
    warning("No webpack config found");
  }

  return merge(userConfig, {
    context,
    entry: { noop: path.resolve(__dirname, "../noop.js") },
    output: {
      path: path.resolve(".container/dist"),
    },
    mode: "production",
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "test",
        exposes,
      }),
    ],
  });
}
