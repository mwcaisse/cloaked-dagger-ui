"use strict";

const { VueLoaderPlugin } = require("vue-loader");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.vue$/, use: "vue-loader" },
            {
                test: /\.css$/, use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Cloaked Dagger",
            hash: true,
            template: path.resolve(__dirname, "public/index.html"),
            templateParameters: {
                "BASE_URL": "/"
            }
        }),
        new VueLoaderPlugin(),
        // Only import the english locales for moment
        new MomentLocalesPlugin({
            localesToKeep: ["en"]
        })
    ],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "src/"),
            "@test": path.resolve(__dirname, "test/unit/"),
        },
        modules: [
            path.resolve(__dirname, "node_modules")
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        port: "3000",
        proxy: {
            "/api": {
                target: "http://localhost:5000"
            }
        },
        historyApiFallback: true
    }
};
