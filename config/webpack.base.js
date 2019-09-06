const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve("src/index.tsx"),
    background: path.resolve("src/scripts/background.js")
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
        ignore: ["*.html" | "*.json"]
      }
    ]),
    new HtmlPlugin({
      template: path.resolve("public/template.html"),
      filename: "index.html",
      chunks: ["index"],
      hash: true,
      title: "Just proxy - options"
    })
  ]
};
