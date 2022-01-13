import path from 'path'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import { URL } from 'url'

const __dirname = new URL('.', import.meta.url).pathname

const common = (version) => ({
    entry: {
        'main': path.resolve('./src/index.js'),
        'bus': path.resolve('./src/Bus/index.js'),
        'dashboard': path.resolve('./src/Dashboard/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version),
            'MODE': JSON.stringify(process.env.MODE)
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico",
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: "./public/index.html",
            filename: "./bus.html",
            favicon: "./public/favicon.ico",
            chunks: ['bus'],
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: "./public/index.html",
            filename: "./dashboard.html",
            favicon: "./public/favicon.ico",
            chunks: ['dashboard'],
        }),
        new CleanWebpackPlugin()
    ]
})

const dev = () => ({
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 9093
    },
    module: {
        rules: [
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
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.dev': true
        }),
        new NodePolyfillPlugin()
    ]
})

import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const production = () => ({
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserPlugin({ /* additional options here */ })],
    },
    module: {
        rules: [
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
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.production': true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
})

export default (env, argv) => {
    dotenv.config({ path: `./.env` })
    if (env.dev) {
        return merge(common(argv.name), dev())
    }
    if (env.production) {
        return merge(common(argv.name), production())
    }
    console.log('Build env not set.')
}