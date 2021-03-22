/** @type {import("webpack").Configuration} */
const clientConfig = {
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
};

/** @type {import("webpack").Configuration} */
const serverConfig = {
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
};

module.exports = [clientConfig, serverConfig];
