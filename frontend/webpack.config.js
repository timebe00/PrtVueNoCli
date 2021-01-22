const path = require('path') // 파일이나 디렉터리 경로를 다루기 위한 NodeJS 기본 모듈
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const merge = require('webpack-merge');
const { merge } = require('webpack-merge');

require('@babel/polyfill')

//  Web Pack 처리과정
//  entry -> module -> plugins -> module

//  opts -> 개발, 옵션?
module.exports = (env, opts) => {
    const config = {
            // 가져오기 확장자 생략 가능
    resolve: {
        extensions: ['.js', '.vue']
    },
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
                    'style-loader', // 1st
                    'css-loader', // 2nd
                    'postcss-loader' // 3rd
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 1st
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
        ]
    })
    ],
    }

    //  개발용
    if (opts.mode === 'devlopement') {
        return merge (config, {
            // 빠르지만 용량 큼
            devtool: 'eval',
            devServer: {
                //  브라우저 바로 열기
                open: true,
                hot: true
            }
        })
        // 제품용
    } else {
        return merge (config, {
            //  느리지만 용량 적음
            devtool : 'cheap-module-source-map',
            plugins: [
                new CleanWebpackPlugin()
            ]
        })
    }
}
