const htmlWebPackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization:{
        minimizer: [new optimizeCssAssetsPlugin()]
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
            }
        ]
    },
    plugins: [
        new htmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new copyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
            ],
        })
    ]

}