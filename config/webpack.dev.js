const webpackMerge = require("webpack-merge");
const WebpackExtensionPlugin = require("webpack-extension-reloader");

const baseConfig = require("./webpack.base");

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new WebpackExtensionPlugin({
      entries: {
        contentScript: "content",
        background: "background",
        extensionPage: ["options"],
      },
    }),
  ],
});
