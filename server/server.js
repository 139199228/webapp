const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const bodyParser = require("body-parser")
const session = require("express-session")
const favicon = require('serve-favicon')
const path = require('path')
const app = express()
const isDev = process.env.NODE_ENV === 'development' //是开发模式

app.use(bodyParser.json())//json格式
app.use(bodyParser.urlencoded({extended:false}))//对应http  请求类型
app.use(session({
  maxAge: 10*60*1000,
  name:"tid",
  resave:false,
  saveUninitalized:false,
  secret:"react cnode class"
}))

app.use(favicon(path.join(__dirname,"../favicon.ico")))

app.use('/api/user',require('./util/handle-login'))
app.use('/api',require('./util/proxy'))

if(!isDev){//如果不是开发模式
    const serverEntry = require('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),'utf8')//以utf8格式读取文件   默认是buff
    app.use('/pubilc',express.static(path.join(__dirname,'../dist')))
    app.get('*' , (req,res) => {
        const appString = ReactSSR.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->',appString))
    })
}else{
    const devStatic = require('./util/dev-static')
    devStatic(app)//如果不是开发默认我们用这个服务
}


app.listen(3333,function(){
    console.log('3333')
})
