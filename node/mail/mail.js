"use strict"
const nodemailer = require('nodemailer')

// 创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",  // 发送方邮箱  node_modules->well-known->services.json
    port: 465, // 端口号
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1206572913@qq.com', // 发送方的邮箱地址
      pass: 'fmuxedqfjyjthgdg' // mtp 验证码
    }
})

// 邮件信息
let message = {
    from: '"Fred Foo 👻" <1206572913@qq.com>', // sender address
    to: "770971581@qq.com", // list of receivers
    subject: "Hello ✔", // 标题
    text: "Hello world?", // 文本和html只能有一个
    html: "<b>Hello world?</b>" // html body
}

// 发送
transporter.sendMail(message)


// 封装方法
function sendMessage(mail, msg) {
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",  // 发送方邮箱  node_modules->well-known->services.json
        port: 465, // 端口号
        secure: true, // true for 465, false for other ports
        auth: {
          user: '1206572913@qq.com', // 发送方的邮箱地址
          pass: testAccount.pass // mtp 验证码
        }
    })
    let message = {
        from: '"Fred Foo 👻" <1206572913@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // 标题
        text: msg, // 文本和html只能有一个
        html: "<b>Hello world?</b>" // html body
    }
}