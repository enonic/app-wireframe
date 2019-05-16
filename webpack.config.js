const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    output: {
        filename: 'main.min.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    mode: 'production'
};
