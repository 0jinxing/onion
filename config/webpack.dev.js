const path = require("path");
const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve("ext", "dev"),
    publicPath: "http://127.0.0.1:8000/"
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  devServer: {
    contentBase: path.resolve("ext", "dev"),
    hot: true,
    disableHostCheck: true,
    port: 8000
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("public", "manifest.dev.json"),
        to: path.resolve("ext", "dev", "manifest.json")
      }
    ]),
    new WriteFilePlugin()
  ]
});
