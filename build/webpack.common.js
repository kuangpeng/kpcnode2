var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, '../dist')
    },
    context: path.resolve(__dirname, '..'),
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    //mode: 'development',
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist'], {
                root: path.resolve(__dirname, '..'),
                //exclude: ['assets'],
                dry: false
            }
        ),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunksSortMode: 'dependency'
        }),
        //new webpack.HotModuleReplacementPlugin()
    ],
    // devServer: {
    //     historyApiFallback: true,
    //     noInfo: true,
    //     overlay: true,
    //     contentBase: './dist',
    //     hot: true
    // },
    // devtool: 'inline-source-map'
}