const path = require("path");

module.exports = {
  entry: {
    home: path.resolve("index.js")
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  optimization: {
    splitChunks: {
      minSize: 25000,
      maxSize: 90000,
      chunks: "all"
    }
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
