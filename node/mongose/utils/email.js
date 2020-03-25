"use strict"
const nodemailer = require('nodemailer')

// 创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",  // 发送方邮箱  node_modules->well-known->services.json
    port: 465, // 端口号
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1206572913@qq.com', // 发送方的邮箱地址
      pass: 'fmuxedqfjyjthgdg', // mtp 验证码
    }
})

// 封装方法
function sendMessage(mail, code) {
    let message = {
        from: '"Fred Foo 👻" <1206572913@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // 标题
        text: `您发送的验证码是 ${code} ,  有效时间为五分钟`, // 文本和html只能有一个
    }
    // 返回 promise 对象异步回调
    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, data) => {
            if (err) {
                reject()
            } else {
                resolve()
            }
        }) 
    })
    
}

module.exports = { sendMessage }