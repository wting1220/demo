const qs = require('querystring')
// 将query字符串转换为对象
let string = 'name-wting&pass-123&sex-0'
// 以哪一个符号切分键值对，以哪一个符号切分键和值
let obj = qs.parse(string, '&', '-')
console.log(obj)

// 将对象转换为字符串
let obj1 = { name: 'wting', pass: '123', sex: '0' }
let string1 = qs.stringify(obj1, '$', '^')
console.log(string1)

// 编码
let string2 = 'w=你好foo=bar'
let res = qs.escape(string2)
console.log(res)

// 解码
let string3 = 'w%3D%E4%BD%A0%E5%A5%BDfoo%3Dbar'
let res1 = qs.unescape(string3)
console.log(res1)