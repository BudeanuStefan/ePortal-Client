const webpack = require('webpack');
const path = require('path');

const VENDOR_LIBS = [
    "axios",
    "history",
    "lodash",
    "prop-types",
    "react",
    "react-dom",
    "react-redux",
    "react-router",
    "react-router-dom",
    "redux",
    "redux-form",
    "redux-thunk"
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    //entry: ["babel-polyfill", "./src"],
    output: {
        path: path.resolve(__dirname, '/'),
        filename: '[name].js',
        publicPath: '/'
    },
    // output: {
    //     path: __dirname,
    //     filename: "bundle.js"
    // },
    resolve: {
        alias: {
            'jquery': path.join( __dirname, 'node_modules/jquery/dist/jquery')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        //contentBase: './',
        inline: true,
        historyApiFallback: true,
        port: 3000,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
   devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map'
};
