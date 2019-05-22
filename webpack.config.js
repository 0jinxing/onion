const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    options: path.resolve("src/options.js")
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
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: { loader: "file-loader" }
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
      filename: "options.html",
      chunks: ["options"],
      hash: true,
      title: "Oh Proxy Options",
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
