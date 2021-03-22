/** @type {import("webpack").Configuration} */
const config = {
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

module.exports = config;
