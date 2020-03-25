/* 
    1. 请求网站数据
    2. 将数据保存本地
*/
// 发起请求是 io 操作，属于异步操作
const http = require('http')
const fs = require('fs')
let url = 'http://www.baidu.com/'
const cheerio = require('cheerio')
http.get(url, res => {

    // 安全判断
    const { statusCode } = res  // 状态码
    const contentType = res.headers['content-type']  // 数据类型
    console.log(statusCode, contentType)
    let error;
    if (statusCode !== 200) {
        error = new Error('请求状态错\n' + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('请求类型错误\n' + `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        res.resume(); // 重置缓存
        return;
    }


    let resData = ''
    // 数据分段  只要接收数据就会触发data 事件 chunk 每次接收的数据片段
    res.on('data', chunk => {
        resData += chunk.toString('utf-8')
    })
    // 数据流传输完毕
    res.on('end', () => {
        console.log('结束')
        // 将请求的数据保存到本地
        // fs.writeFileSync('./bilibili.html', resData)
        // 通过 cheerio 分析
        let $ = cheerio.load(resData)
        $('img').each((index, el) => {
            console.log($(el).attr('src'))
        })
    })
}).on('error', err => {
    console.log(err)
})


// let obj = {
//     name: 123
// }