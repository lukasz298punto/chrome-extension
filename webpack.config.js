const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        popup: path.join(__dirname, "src", "popup.ts"),
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/popup.html",
            filename: "popup.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/manifest.json" },
                { from: "./src/icons/get_started16.png" },
                { from: "./src/icons/get_started32.png" },
                { from: "./src/icons/get_started48.png" },
                { from: "./src/icons/get_started128.png" },
            ],
        }),
    ],
    mode: "development",
};
