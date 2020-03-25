const express = require('express')
const app = express()
const path = require('path')

console.log(__dirname)
console.log(path.join(__dirname, './hehe'))
// 创建静态目录
app.use(express.static(path.join(__dirname, './hehe')))
app.use('/public', express.static(path.join(__dirname, './hehe')))
// 域名：端口号  ---  直接指向规定的静态目录 hehe

app.listen(3000, () => {
    console.log('static start')
})