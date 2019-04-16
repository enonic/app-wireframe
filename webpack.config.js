const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: 'main.min.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};
