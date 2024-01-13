import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common.js';
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
export default merge(common, {
    context: path.resolve(__dirname, "./src"),
  mode: "development",
  stats: "errors-only",
  devtool: "eval-source-map",
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
    devMiddleware: {
      stats: "errors-only",
    },
  }
});