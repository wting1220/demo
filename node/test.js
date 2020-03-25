const axios = require('axios')

async function test() {
    let str = '126846'
    str = await axios.get('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=02003390_43_hao_pg&wd=mock%20json&oq=mokc%2520json')
    console.log(22222)
    return str
}
console.log(111)
test().then((data) => {
    console.log(data.status)
})