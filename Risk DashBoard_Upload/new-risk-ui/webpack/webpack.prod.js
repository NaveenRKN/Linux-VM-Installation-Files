const webpack = require("webpack");

const GLOBALS = {
  "process.env.NODE_ENV": JSON.stringify("production"),
  __DEV__: false,
};

module.exports = {
  mode: "production", 
  devtool: "nosources-source-map",
  plugins: [new webpack.DefinePlugin(GLOBALS)],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    client: {
      overlay: { errors: true, warnings: false, runtimeErrors: false },
    },
  },
};
