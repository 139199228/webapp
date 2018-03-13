const path = require('path');
module.exports = {
    entry : {//主入口文件
        app : path.join(__dirname , '../client/app.js')
    },
    output : {
        filename : '[name].[hash].js',//对整个js有任何一个文件改了 hash值会改变 引用js有任何文件改的就刷新浏览器的缓存，如果没有改动不刷新浏览器的缓存
        path : path.join(__dirname,'../dist'),//输出的文件存放到哪里
        publicPath : ''//如果是空的 app.hash.js如果有值  放到pubilc/app.hash.js   帮我们区分url是静态资源还是api请求，还有特殊处理的请求  加个前缀
    },
    module:{
        rules:[
            {
                test:/.jsx$/,
                loader:'babel-loader'//只是webpack插件  安装babel-core核心文件
            }
        ]
    }
}