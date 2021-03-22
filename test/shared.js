const pkg = require("./package.json");

module.exports = {
  react: {
    singleton: true,
    requiredVersion: pkg.dependencies.react,
  },
  "react-dom": {
    singleton: true,
    requiredVersion: pkg.dependencies["react-dom"],
  },
};
