const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const SRC_DIR = "/src/main/resources/assets/";
const DST_DIR = "/build/resources/main/assets";
const outputPath = path.join(__dirname, DST_DIR);

module.exports = {
    entry: {
        "js/main.min.js" : SRC_DIR + "js/main.js"
    },
    output: {
        path: outputPath,
        filename: './[name]'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false
                    },
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    mode: isProd ? 'production' : 'development'
};
