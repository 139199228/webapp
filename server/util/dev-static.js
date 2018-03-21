const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
const ReactDomServer = require('react-dom/server')
const getTemplate = () => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8888/public/index.html')
        .then(res => {
            console.log(res.data)
          resolve(res.data)
        })
       .catch(reject)
    })
  }
const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({},(err,stats) => {
    if(err) throw err
    stats = stats.toJson()//监听的值 转换成 json
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    const m = new Module()
    m._compile(bundle,"server-entry.js")
    serverBundle = m.exports.default
})
module.exports = function (app) {
    app.use('/public',proxy({
        target: 'http://localhost:8888'
    }))
    app.get('*',(req,res) => {  
        getTemplate().then(template => {
            console.log(template)
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->',content))
        })
    })
}