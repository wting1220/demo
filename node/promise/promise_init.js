const fs = require('fs')

// 异步操作需要遵循一定的顺序

// fs.stat('./hehe.js', (err, stats) => {
//     // console.log(err, stats)
//     if (err) {
//         console.log('不存在')
//     } else {
//         fs.unlink('./hehe.js', (err) => {
//             console.log(err)
//             fs.writeFile('./test.js', 'xxx', () => {
//                 ...
//             })
//         })
//     }
// })

function delfile() {
    return new Promise((resolve, reject) => {
        // 异步操作
        fs.unlink('./hehe.js', err => {
            if (err) {
                // 失败
                reject('失败了')
            } else {
                // 成功
                resolve('成功了')
            }
        })
    })
}

delfile().then(msg => {
    // 执行 resolve 
    console.log('then' + msg)
}).catch(error => {
    // 执行 reject 
    console.log('catch' + error)
})