const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry').default
const app = express()
const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),'utf8')//以utf8格式读取文件   默认是buff
app.use('/pubilc',express.static(path.join(__dirname,'../dist')))
app.get('*' , (req,res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->',appString))
}).listen(8889)
