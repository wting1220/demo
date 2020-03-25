const express = require('express')
const app = express()

// 为根路径 ’/‘ 时，可以省略不写
app.use('/', (req, res, next) => {
    console.log('中间件拦截器')
    let { token } = req.query
    token ? next() : res.send('fail')
    // next()  // 是否继续往下执行
})

app.get('/test1', (req, res) => {
    console.log('test1')
    res.send('test1')
})

app.get('/test2', (req, res) => {
    console.log('test2')
    res.send('test2')
})

app.listen(3000, () => {
    console.log('middlewear start')
})