// 读取文件夹

const fs = require('fs')
// 同步读取文件  在关键位置读取信息不能造成程序崩溃
let dirs
try {
    // 可能出错的代码
    dirs = fs.readdirSync('../')
} catch (err) {
    console.log('出错了' + err)
}
console.log(222)
console.log(dirs)
// 异步读取文件
fs.readdir('../', (err, data) => {
    console.log(err, data)
    if (err) {
        console.log('读取错误')
    } else {
        console.log(data)
    }
})

// 错误的回调优先，在回调函数中第一个参数表示错误对象，默认为 null，如果出现错误 err，就是错误对象

// 错误处理 同步: try catch 异步: 错误回调优先
// 文件夹的错误
// curd : 表示数据库中的增删改查