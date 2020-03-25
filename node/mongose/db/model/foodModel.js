const mongoose = require('mongoose')
// scheme 对象
// 创建一个和集合相关的 scheme 对象，类似于表头
const foodSchema = mongoose.Schema
// 获取 scheme 对象
const schema = new foodSchema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    typeName: { type: String, required: true },
    typeId: { type: Number, required: true },
    image: { type: String, required: true },
})
// 将 scheme 对象转换为数据模型
var Food = mongoose.model('food', schema)  // 该数据对象和集合关联('集合名', scheme 对象)
// 抛出
module.exports = Food