const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'//判断开发环境
const config = {
    entry : {//主入口文件
        app : path.join(__dirname , '../client/app .js')
    },
    output : {
        filename : '[name].[hash].js',//对整个js有任何一个文件改了 hash值会改变 引用js有任何文件改的就刷新浏览器的缓存，如果没有改动不刷新浏览器的缓存
        path : path.join(__dirname,'../dist'),//输出的文件存放到哪里
        publicPath : '/public/'//如果是空的 app.hash.js如果有值  放到pubilc/app.hash.js   帮我们区分url是静态资源还是api请求，还有特殊处理的请求  加个前缀
    },
    module:{
        rules:[
            {
                test:/.jsx$/,
                loader:'babel-loader',//只是webpack插件  安装babel-core核心文件
                options:{
                    cacheDirectory:true,
                    plugins:['react-hot-loader/babel']
                }
            },
            {
                test:/.js$/,
                loader:'babel-loader',
                exclude:[//不搜索node_modules文件包
                    path.join(__dirname,"../node_modules")
                ]
            }
        ]
    },
    plugins:[
        new htmlPlugin({
            template:path.join(__dirname,"../client/template.html")//生成页面文件入口
        })
    ]
}

if(isDev){//如果是开发环境
    config.entry = {
        app:[//引入热启动
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {//启动服务
        host: '127.0.0.1',//访问地址
        port: "8889",//端口号
        compress: true,
        hot: true,//启动热启动
        contentBase: path.join(__dirname,'../dist'),//服务器在哪个目录搭建
        overlay:{//webpack报错  网页显示错误信息
            errors:true  //只显示错误
        },
        publicPath:"/public/",
        historyApiFallback:{//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面
            index:"/public/index.html"
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())//热启动模块  添加删除无需重新加载
}
module.exports = config