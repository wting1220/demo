const express = require('express')
const app = express()

// 局部中间件
app.get('/test1', (req, res, next) => {
    console.log('fun1')
    let { token } = req.query
    token ? next() : res.send('token 不存在')
}, (req, res) => {
    console.log('fun2')
    res.send('局部中间件')
})

app.listen(3000, () => {
    console.log('middlewear start')
})