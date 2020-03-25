// 创建文件夹

const fs = require('fs')
fs.mkdir('./test', (err) => {
    console.log(err)
})

// 更改文件夹名字
fs.rename('./test', './testtest', err => {
    if (err) {
        console.log('错误了')
    } else {
        console.log('成功了')
    }
})

// 删除文件夹（空的文件夹）
fs.rmdir('./test1', err => {
    if (err) {
        console.log('错误了', err)
    } else {
        console.log('成功了')
    }
})