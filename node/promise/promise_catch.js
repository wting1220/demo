const fs = require('fs')

// 1. 封装
function isExit() {
    return new Promise((resolve, reject) => {
        fs.stat('./hehe.js', (err, stats) => {
            if (err) {
                reject('文件不存在')
            } else {
                resolve('成功了')
            }
        })
    })
}

function delfile() {
    return new Promise((resolve, reject) => {
        fs.unlink('./hehe.js', err => {
            if (err) {
                reject('出错了')
            } else {
                resolve('成功了')
            }
        })
    })
}

// 在一组链式调用中，只需要一个 catch
// 手动终止链式调用 --- 抛出一个错误
isExit().then(() => {
    // 文件存在的成功处理
    return delfile().then(() => {
        // 删除文件的成功处理
        console.log('删除成功')
        throw new Error('手动终止')
    }).then(() => {
        console.log('1111111')
    }).then(() => {
        console.log('2222222')
    })
}).catch(err => {
    console.log(err)
})