var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, 'js/app/index.js'),
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.less$/, //以.less结尾,就通过解析工具，从后往前执行解析
            use: ["style-loader", "css-loader", "less-loader"]
        }]
    },
    resolve: {
        alias: { //当require一个模块的时候以jquery开头，就找该路径,不在module中找
            jquery: path.join(__dirname, 'js/lib/jquery-2.0.3.min.js'),
            mod: path.join(__dirname, 'js/mod'),
            less: path.join(__dirname, 'less') //注意文件路径
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}