const webpack = require("webpack");

const shared = require("./shared");

/** @type {import("webpack").Configuration} */
const config = {
  target: "node",
  entry: {
    vercel: "./src/vercel.js",
  },
  output: {
    library: { type: "commonjs" },
  },
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
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      shared,
    }),
  ],
};

module.exports = config;
