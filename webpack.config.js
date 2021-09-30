const webpack = require("webpack");
const path = require("path");
const globImporter = require("node-sass-glob-importer");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlMinifierPlugin = require("html-minifier-webpack-plugin");

const isProd = true;

const SRC_DIR = "src/main/resources";
const DST_DIR = "build/resources/main";

const ABS_SRC_DIR = path.resolve(__dirname, SRC_DIR);
const ABS_DST_DIR = path.resolve(__dirname, DST_DIR);

JS_CONFIG = {
    context: ABS_SRC_DIR,
    entry: {
        main: "./assets/js/main.js",
    },
    output: {
        path: ABS_DST_DIR,
        filename: "assets/js/[name].min.js",
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
    mode: isProd ? "production" : "development",
};

STYLE_ASSETS_CONFIG = {
    stats: {
        colors: true,
        hash: false,
        modules: false,
        version: false,
        moduleTrace: false,
    },
    context: ABS_SRC_DIR,
    entry: {
        main: "./assets/css/main.scss",
    },
    output: {
        path: ABS_DST_DIR,
        filename: "css/[name].bundle.js", // Empty js bundle
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: { publicPath: "../" },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            sourceMap: isProd,
                            sassOptions: {
                                //errLogToConsole: true,
                                importer: globImporter(),
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                type: "asset/inline",
            },
            {
                test: /\.(jpe|jpg|png|svg)(\?.*$|$)/,
                use: {
                    // May conflict with image minification?
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                        name: "./assets/img/[name].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css",
        }),
        new ImageminPlugin({
            disable: !isProd, // Disable during development
            pngquant: {
                quality: "95-100",
            },
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            test: /\.(jpe?g|png|gif|svg)$/i,
        }),
        new HtmlMinifierPlugin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "**/*.html",
                    to: "[path][name][ext]",
                },
                {
                    from: "assets/img/**/*.svg",
                    to: "[path][name][ext]",
                },
            ],
        }),
    ],
    performance: {
        hints: false // Unsure if this is a good thing to ignore
    },
    mode: isProd ? "production" : "development",
};

module.exports = [STYLE_ASSETS_CONFIG, JS_CONFIG];
