const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    output: {
        filename: 'main.min.js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: !isProd,
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
