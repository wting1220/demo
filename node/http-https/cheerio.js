const cheerio = require('cheerio')
let $ = cheerio.load('<div><p>hello</p><p>你好</p><img src="wting.com"></div>')
// 将一组 html 格式的字符串转化为类 dom 结构，通过 jq 语法选择元素
console.log($('img').attr('src'))
console.log($('p').text())  // 自动获取第一个 p 标签的 text
// 获取所有 p 标签内容
$('p').each((el, index) => {
    console.log($(el).text())
})