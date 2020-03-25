const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/user', {useNewUrlParser: true})
var db = mongoose.connection  // 数据库的连接对象
db.on('error', function() {
    console.log('连接失败')
})
db.once('open', function() {
    console.log('数据库连接成功')
}) 