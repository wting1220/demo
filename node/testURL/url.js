const url = require('url')

let urlString = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
let urlObj = url.parse(urlString)
console.log(urlObj)

let urlObj1 = {
    protocol: 'https:',
    slashes: true,
    auth: 'user:pass',
    host: 'sub.example.com:8080',
    port: '8080',
    hostname: 'sub.example.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=string',
    href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
}
let urlString1 = url.format(urlObj1)
console.log(urlString1)


/*
url 类比 json 记忆

url.parse  将字符串转换为对象
url.format  将对象转换为字符串
*/
