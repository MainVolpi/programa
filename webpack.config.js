const path = require('path'); // CommonJS

module.exports = {
    mode: 'production',
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: '[name].js', // [name] will be replaced by the corresponding entry name
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }
            ]
        }

        ]
    },
    devtool: 'source-map'
};