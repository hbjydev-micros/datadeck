const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: production ? 'production' : 'development',
    entry: [
        './src/static/datadeck.ts',
        './src/static/datadeck.css'
    ],
    optimization: {
        minimize: false,
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'static'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader" ]
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
};
