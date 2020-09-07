const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: path.resolve("ext", "dev"),
    hot: true,
    disableHostCheck: true,
    port: 8000,
    headers: { "Access-Control-Allow-Headers": "*" }
  },
  plugins: [new WriteFilePlugin()]
});
