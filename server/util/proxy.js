const axios = require('axios')
const baseUrl = 'https://cnodejs.org/api/v1'
module.exports = function (req, res, next) {
  const path = req.path  //借口地址
  const user = req.session.user || {}//判断用户有没有登录
  const needAccessToken = req.query.needAccessToken //
  if(needAccessToken && user.accessToken){
    res.status(401).send({
      success:false,
      msg:"need login"
    })
  }
  console.log(req)
  const query = Object.assign({} , req.query)
  if(query.needAccessToken){
    delete query.needAccessToken
  }
  console.log(user)
  axios(`${baseUrl}${path}`,{
    methods:req.methods,
    data:Object.assign({},req.body,{
      accesstoken:user.accessToken
    }),
    header:{
      "Content-Type":"application/x-www-form-urlencode"
    }
  }).then(resp => {
    if(resp.status === 200){
      res.send(resp.data)
    }else{
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if(err.response){
      res.status(404).send(err.response.data)
    }else{
      res.status(500).send({
        success: false,
        msg:"未知错误"
      })
    }
  })
}
