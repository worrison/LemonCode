const path = require('path');
module.exports = {
    resolve: {
        extensions: [".js", ".ts"]
    },
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
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
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './src'),
        },
    }
}