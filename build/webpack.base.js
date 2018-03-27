const path = require("path")
module.exports = {
    output:{
      path : path.join(__dirname,'../dist'),//输出的文件存放到哪里
      publicPath : '/public/',//如果是空的 app.hash.js如果有值  放到pubilc/app.hash.js   帮我们区分url是静态资源还是api请求，还有特殊处理的请求  加个前缀
    },
    resolve: {
      extensions: ['.js', '.jsx']
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
  }
}
