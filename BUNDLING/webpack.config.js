import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  entry: {
    app: "./src/students.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    clean:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["MiniCssExtractPlugin", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
    new MiniCssExtractPlugin({ 
         filename: "[name].css" }),
  ],
};
