const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./src/js/plugin.js", "./src/themes/material.dark.less"],
    devtool: "source-map",
    mode: "development",
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "src/less")
                ],
                use: [
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "src/themes")
                ],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "d3fc.plugin.dark.css" })
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: { sourceMap: true, mangle: false }
            })
        ]
    },
    output: {
        filename: "d3fc.plugin.js",
        library: "perspective-view-d3fc",
        libraryTarget: "umd",
        path: path.join(__dirname, "build")
    },
    devServer: {
      contentBase: [
        path.join(__dirname, 'examples'),
        path.resolve(__dirname, "node_modules/@jpmorganchase/perspective/build"),
        path.resolve(__dirname, "node_modules/@jpmorganchase/perspective-viewer/build"),
        path.resolve(__dirname, "node_modules/@jpmorganchase/perspective-viewer-highcharts/build"),
        path.resolve(__dirname, "node_modules/@jpmorganchase/perspective-viewer-hypergrid/build")
      ]
    }
};
