import path from 'path'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack from 'webpack'
import { URL } from 'url'

const __dirname = new URL('.', import.meta.url).pathname

const dev = (version) => ({
    mode: 'development',
    target: 'web',
    entry: [path.resolve('./src/index.js')],
    devtool: 'inline-source-map',
    devServer: {
        port: 9093,
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "source-map-loader",
                    { loader: "babel-loader" }
                ],
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\,html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                loader: "url-loader"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico"
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version),
            'MODE': JSON.stringify(process.env.MODE)
        }),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({ 'process.env.dev': true })
    ]
})

import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const production = (version) => ({
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({ /* additional options here */ })],
    },
    entry: [path.resolve('./src/index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "source-map-loader",
                    { loader: "babel-loader" }
                ],
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\,html$/,
                use: [
                    {
                        loader: "html-loader", options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico"
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version),
            'MODE': JSON.stringify(process.env.MODE)
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
})

export default (env, argv) => {
    dotenv.config({ path: `./.env` })
    if (env.dev) {
        return dev(argv.name)
    }
    if (env.production) {
        return production(argv.name)
    }
    console.log('Build env not set.')
}