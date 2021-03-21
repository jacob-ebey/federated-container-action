const { merge } = require("webpack-merge");

/** @type {import("webpack").Configuration} */
const baseConfig = {};

/** @type {import("webpack").Configuration} */
const clientConfig = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [require.resolve("@babel/preset-env"), { targets: "defaults" }],
              require.resolve("@babel/preset-react"),
            ],
          },
        },
      },
    ],
  },
});

/** @type {import("webpack").Configuration} */
const serverConfig = merge(baseConfig, {
  target: "node",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("@babel/preset-react")],
          },
        },
      },
    ],
  },
});

module.exports = [clientConfig, serverConfig];
