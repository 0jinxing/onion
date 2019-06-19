const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve("src/index.js"),
    background: path.resolve("src/scripts/background.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve("build")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: { loader: "file-loader" }
      },
      {
        test: /\.pac$/,
        use: { loader: "raw-loader" }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("public"),
        ignore: "template.html"
      }
    ]),
    new HtmlWebPackPlugin({
      template: path.resolve("public/template.html"),
      filename: "index.html",
      chunks: ["index"],
      hash: true,
      title: "Heroic Proxy Options",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};
