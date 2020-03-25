const fs = require('fs')

// 创建文件
    // (覆盖)
fs.writeFile('name.txt', '法国兰蔻wode ', err => {
    if (err) {
        console.log('出错了', err)
    } else {
        console.log('成功了')
    }
})
   
// 写入文件
 // 不覆盖，拼接
fs.appendFile('name.txt', 'nihao', err => {
    if (err) {
        console.log('出错了', err)
    } else {
        console.log('成功了')
    }
})

// 读取文件
fs.readFile('name.txt', (err, data) => {
    if (err) {
        console.log('出错了', err)
    } else {
        // 默认读取二进制文件
        console.log(data.toString('utf-8'))
    }
})

// 删除文件
fs.unlink('name.txt', err => {
    if (err) {
        console.log('出错了', err)
    } else {
        console.log('成功了')
    }
})