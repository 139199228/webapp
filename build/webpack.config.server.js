const path = require('path');
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.base")
module.exports = webpackMerge(baseConfig,{
    target:"node",
    entry : {//主入口文件
        app : path.join(__dirname , '../client/server-entry.js')
    },
    output : {
        filename : 'server-entry.js',//对整个js有任何一个文件改了 hash值会改变 引用js有任何文件改的就刷新浏览器的缓存，如果没有改动不刷新浏览器的缓存
        libraryTarget:"commonjs2"
    }
})
