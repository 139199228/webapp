const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'
router.post(`/login`,(req,res,next) => {
    axios.post(`${baseUrl}/accesstoken`,{
      accessToken:req.body.accessToken
    })
      .then(resp => {
        console.log(resp)
        if(resp.status === 200 && resp.data.success){
          res.session.user = {
             accessToken:req.body.accessToken,
             loginName:resp.data.loginname,
             id:resp.data.id,
             avatarUrl:resp.data.avatar_url
          }
        }
        res.json({
          success:true,
          data:resp.data
        })
      })
      .catch(err => {
        if(err.response){
          res.json({
            success:false,
            data:resp.data
          })
        }else{
          next(err)
        }
      })
})
module.exports = router
