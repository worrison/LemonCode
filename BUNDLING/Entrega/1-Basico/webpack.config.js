import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default {
    mode: 'development',
    context: path.resolve(__dirname, "./src"),
    resolve:{
        extensions: ['.ts', '.js'],
    },
    entry: {
        app: "./index.ts",
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      }, 
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
              },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
              },
        ]
    },
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
      },
    plugins: [
        //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
          filename: "index.html", //Nombre del fichero dentro de ./dist/
          template: "./index.html", //Nombre del fichero dentro de ./src
          scriptLoading: "blocking", // Just use the blocking approach (no modern defer or module)
          hash:true
        }),
      ],
}