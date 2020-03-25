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

// scheme 对象
// 创建一个和集合相关的 scheme 对象，类似于表头
const Schema = mongoose.Schema
// 获取 scheme 对象
const schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    sex: { type: Number, default: 0 },
})
// 将 scheme 对象转换为数据模型
var User = mongoose.model('user', schema)  // 该数据对象和集合关联('集合名', scheme 对象)
// 操作数据库

// 插入
User.insertMany({ username: 'wting', password: '123456', age: 18 })
.then(data => {
    console.log(data)
    console.log('insert success')
})
.catch(err => {
    console.log('insert fail')
})
// 查询
User.find({})
.then(data => {
    console.log(data)
    console.log('select success')
})
.catch(err => {
    console.log('select fail')
})