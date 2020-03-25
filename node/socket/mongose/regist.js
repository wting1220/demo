const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const cookie = require('cookie-parser')
const jwt = require('./utils/jwt')
// const request = require('request')
// 转换数据格式
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// 静态文件目录
app.use('/public', express.static(path.join(__dirname, './utils')))
// 跨域
app.use(cors())
// session 整体配置
app.use(session({
    secret: 'keyboard cat',   // 为了安全设置密钥
    resave: false,  // 即使 session 值没有被修改，也保存 session 值
    saveUninitialized: true,  // 无论有没有 session cookie ,每次请求都设置 session cookie
    cookie: { maxAge: 60 * 1000 }  // 设置 cookie 过期时间
}))


// 引入路由
const userRouter = require('./router/userRouter')
app.use('/user', userRouter)
const foodRouter = require('./router/foodRouter')
app.use('/food', (req, res, next) => {
    // console.log(req.session)
    // if (req.session.login) {
    //     next()
    // } else {
    //     res.send({err: -99, msg: '请重新登录'})
    // }
    let {token} = req.body
    jwt.verifyToken(token)
    .then(() => {
        next()
    })
    .catch(() => {
        res.send({ err: -1, msg: 'token 验证错误' })
    })
}, foodRouter)
const fileRouter = require('./router/fileRouter')
app.use('/file', fileRouter)


app.listen(3000, () => {
    console.log('打开')
})