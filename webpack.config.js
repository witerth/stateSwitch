const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",//入口文件，src目录下的index.js文件，
    output: {
        path: path.resolve(__dirname, './dist'),//输出路径，就是新建的dist目录，
        publicPath: '/dist/',
        filename: 'stateSwitch.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    mode:'development',
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env' ]
                }
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}