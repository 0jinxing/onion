const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve("src/index.tsx"),
    background: path.resolve("src/scripts/background/index.ts"),
    content: path.resolve("src/scripts/content/index.ts")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve("src")
    }
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
        test: /\.s?css$/,
        use: [
          "style-loader",
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: { implementation: require("sass") }
          }
        ]
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
