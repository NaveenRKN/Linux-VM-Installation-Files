const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development', 
  plugins: [ 
    new HtmlWebpackPlugin({
      template: "./src/index.html", // base html
    }),
  ], 
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    client: {
      overlay: { errors: true, warnings: false, runtimeErrors: false },
    },
    magicHtml: true,
    historyApiFallback: true,
  },
}