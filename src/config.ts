import path from "path";

import { getInput, warning } from "@actions/core";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
const FederatedStatsPlugin = require("webpack-federated-stats-plugin");

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

export async function makeConfig(): Promise<Configuration[]> {
  /** @type {import("webpack")} */
  const webpack = require("webpack");

  const [exposes, context] = await loadExposes();
  const configInput = getInput("config") || "./webpack.config.js";
  const configPath = path.resolve(configInput);
  let userConfig: Configuration | Configuration[] = {};
  try {
    userConfig = require(configPath);
  } catch (err) {
    warning("No webpack config found");
    warning(err);
  }

  const federationConfig: Configuration = {
    context,
    entry: { noop: path.resolve(__dirname, "../noop.js") },
    output: {
      path: path.resolve(".container/client"),
    },
    mode: "production",
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "test",
        exposes,
      }),
    ],
  };

  if (!Array.isArray(userConfig)) {
    userConfig = [userConfig];
  }

  return userConfig.map((config) => {
    const baseConfig = merge(config, federationConfig, {});

    if (baseConfig.target !== "node") {
      baseConfig.plugins = baseConfig.plugins || [];
      baseConfig.plugins.push(
        new FederatedStatsPlugin({ filename: "federation-stats.json" })
      );
    } else {
      baseConfig.output = baseConfig.output || {};
      baseConfig.output.path = path.resolve(".container/server");
    }

    return baseConfig;
  });
}
