const path = require("path");
const merge = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve("ext", "prod")
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("public", "manifest.prod.json"),
        to: path.resolve("ext", "prod", "manifest.json")
      }
    ])
  ]
});
