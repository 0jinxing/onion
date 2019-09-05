const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve("src/index.js"),
    background: path.resolve("src/scripts/background.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve("ext")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader" }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
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
