# federated-container-action

Build a container based on a few files in your project.

```yaml
name: CI
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "12"
      - run: yarn

      - name: Local action test
        id: container
        uses: ./
        with:
          exposes: "exposes.js"
          config: "webpack.config.js"

      - run: echo ${{ steps.container.outputs.path0 }}
      - run: ls -lh ${{ steps.container.outputs.path0 }}
```

## Configuration Files

**shared.js**

A js file that describes what packages should be marked as shared in your container.

```js
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
```

**exposes.js**

A js file that describes the modules that your container federates.

```js
module.exports = {
  "./hero-component": "./src/hero-component.js",
};
```
