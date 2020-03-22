const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackExtensionPlugin = require("webpack-extension-reloader");

const mode = process.env.NODE_ENV;
const isDev = mode === "development";

const jsLoader = ["babel-loader"];

const tsLoader = [...jsLoader, "ts-loader"];

const cssLoader = [MiniCssExtractPlugin.loader, "css-loader"];

const sassLoader = [
  ...cssLoader,
  { loader: "sass-loader", options: { implementation: require("sass") } }
];

const imageLoader = [{ loader: "url-loader", options: { limit: 8192 } }];

const rawLoader = [{ loader: "raw-loader" }];

module.exports = {
  mode,
  devtool: "inline-cheap-source-map",

  entry: {
    content: path.resolve("src/scripts", "content/index.ts"),
    background: path.resolve("src/scripts", "background/index.ts"),
    options: path.resolve("src", "index.tsx")
  },

  output: {
    path: path.resolve("dist", isDev ? "dev" : "prod"),
    filename: "[name].bundle.js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: { "@": path.resolve("src") }
  },

  plugins: [
    new WebpackExtensionPlugin({
      entries: {
        contentScript: "content",
        background: "background",
        extensionPage: ["options"]
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("public/template.html"),
      filename: "index.html",
      chunks: ["options"],
      hash: true,
      title: "PROXY - OPTIONS"
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([
      {
        from: isDev
          ? path.resolve("public", "manifest.dev.json")
          : path.resolve("public", "manifest.prod.json"),
        to: "manifest.json"
      },
      { from: path.resolve("public", "icon.png") }
    ]),
    new webpack.SourceMapDevToolPlugin({
      exclude: /.*\.ts/
    })
  ],

  module: {
    rules: [
      { test: /\.jsx?$/, use: jsLoader },
      { test: /\.tsx?$/, use: tsLoader },
      { test: /\.css$/, use: cssLoader },
      { test: /\.pac$/, use: rawLoader },
      { test: /\.s[ac]ss$/, use: sassLoader }
    ]
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        common: { name: "common", chunks: "all", priority: 1 },
        vendor: {
          chunks: "all",
          test: /node_modules/,
          priority: 2,
          name: mod => {
            const pathArr = mod.context.split(path.sep);
            const nameInd = pathArr.findIndex(p => p === "node_modules") + 1;
            return pathArr[nameInd];
          }
        }
      }
    }
  }
};
