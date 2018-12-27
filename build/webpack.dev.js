const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    useRelativePath: true,
                    name: '[name].[ext]'
                }
            }
        ]
    }
});