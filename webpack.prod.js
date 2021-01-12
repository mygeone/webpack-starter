const htmlWebPackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'production',
    optimization:{
        minimizer: [new optimizeCssAssetsPlugin()]
    },
    output:{
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }

            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }

                    }
                ]
            },
            {
                test: /style\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),
        new copyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
            ],
        }),
        new MinifyPlugin()
        
    ]
}