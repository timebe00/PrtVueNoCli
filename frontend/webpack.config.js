const path = require('path') // 파일이나 디렉터리 경로를 다루기 위한 NodeJS 기본 모듈
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')

require('@babel/polyfill')

module.exports = {
    //  진입점
    entry: {
        //  __dirname : 현재 위치를 알려주는 경로
        app: [
            '@babel/polyfill',
            path.join(__dirname, 'main.js')
        ]
    },
    //  결과물에 대한 설정
    output: {
        //  결과물이 나오는 위치
        filename: '[name].bundle.js',      //  emtry의 별칭인 app.js에 들어감
        path: path.join(__dirname, 'dist')
    },
    //  webpack의 처리과정에 들어감
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader', // 1st
                    'css-loader', // 2nd
                    'postcss-loader' // 3rd
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader', // 1st
                    'css-loader', // 2nd
                    'postcss-loader', // 3rd
                    'sass-loader' // 4th
                ]
            },
            {
                test: /\.?js$/,
                exclude: /node_modules/, // 제외할
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    //  추가적인 처리
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),
        new CopyPlugin({
            patterns: [
            {
                from: 'assets/',
                to: ''
            }
        ]})
    ]
}

//  Web Pack 처리과정
//  entry -> module -> plugins -> module