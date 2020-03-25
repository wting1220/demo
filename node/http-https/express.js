const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// 实例化

// 监听 3000 端口，开启服务器
app.listen(port, () => {
    console.log('start')
})

// app.use 使用插件
// 解析 form 表单数据 x-www-url-encode
app.use(bodyParser.urlencoded({ extended: false }))
// 解析 json
app.use(bodyParser.json())


// 最简单的 api 接口
// http:localhost:3000/user/login
app.get('/user/login', (req, res) => {
    // 如何接收参数
    console.log(req.query)
    // 拿到数据
    let {u, pwd} = req.query
    // 处理数据
    u === 'wting' && pwd === '12345' ? res.send({ err: 'null', login: 'ok'}) : res.send({ err: 'null', login: 'fail'})
})
app.post('/user/regist', (req, res) => {
    // 如何接收参数 消息体 请求体
    // express 不能直接解析消息体，需要通过第三方插件实现解析
    let {u, pwd} = req.body
    // 处理数据
    res.send({ err: 'null', msg: 'regist success'})
})
