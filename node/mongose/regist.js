const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')
const cors = require('cors')
// const request = require('request')
// 转换数据格式
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// 静态文件目录
app.use('/public', express.static(path.join(__dirname, './utils')))
// 跨域
app.use(cors())

// 引入路由
const userRouter = require('./router/userRouter')
app.use('/user', userRouter)
const foodRouter = require('./router/foodRouter')
app.use('/food', foodRouter)
const fileRouter = require('./router/fileRouter')
app.use('/file', fileRouter)


app.listen(3000, () => {
    console.log('打开')
})