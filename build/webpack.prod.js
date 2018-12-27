const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    useRelativePath: true,
                    name: '[name].[ext]?[hash]',
                    outputPath: 'assets/',
                    publicPath: 'assets/'
                }
            }
        ]
    },
    plugins: [
        
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
});