const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const email = require('../utils/email')
const jwt = require('../utils/jwt')


let codes = {}

/**
 * @api {post} /user/regist 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiParam {String} code 验证码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/regist', (req, res) => {
    // 获取数据
    let { username, password, code } = req.body
    if (username && password && code) {
        console.log(codes[username], code)
        if (codes[username] === code) {
            User.find({ username })
            .then((data) => {
                if (data.length > 0) {
                    res.send({ err: -2, msg: '用户已存在' })
                } else {
                    return User.insertMany({ username, password })
                }
            })
            .then(() => {
                res.send({ err: null, msg: '注册成功' })
            }).catch(() => {
                res.send({ err: 'error', msg: '注册失败' })
            })
        } else {
            return res.send({ err: -3, msg: '验证码错误' })
        }
    } else {
        return res.send({ err: -1, msg: '数据不对' })
    }
    // 数据处理
    // 返回数据
    
})

/**
 * @api {post} /user/login 用户登陆
 * @apiName 用户登陆
 * @apiGroup User
 *
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/login', (req, res) => {
    // 判断验证码是否正确
    let { username, password } = req.body
    if (username && password) {
        User.find({ username, password })
        .then((data) => {
            if (data.length > 0) {
                let token = jwt.createToken({ login: true, name: username })
                res.send({ err: null, msg: '登陆成功', token })
                // req.session.login = true,
                // req.session.name = username
            } else {
                res.send({ err: 'error', msg: '登陆失败' })
            }
        })
        .catch(() => {
            return res.send({ err: 'error', msg: '内部出错' })
        })
    } else {
        return res.send({ err: -1, msg: '参数错误' })
    }
})

/**
 * @api {post} /user/getMailCode 验证码获取
 * @apiName 验证码获取
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱.
 *
 * @apiSuccess {String} code 验证码.
 */

// 邮箱验证
router.post('/getMailCode', (req, res) => {
    let { mail } = req.body
    let code = parseInt(Math.random() * (9999 - 1000) + 1000)
    let date = Math.round(new Date() / 1000)
    console.log(date, codes['date'])
    if (codes['date']) {
        if (date - codes['date'] > 300) {
            email.sendMessage(mail, code).then(() => {
                codes[mail] = code
                codes['date'] = date
                res.send({err: null, msg: '验证码发送成功'})
            }).catch(() => {
                res.send({err: 'error', msg: '验证码发送失败'})
            })
        } else {
            res.send({err: null, msg: '已发送请求，请稍后'})
        }
    } else {
        email.sendMessage(mail, code).then(() => {
            codes[mail] = code
            codes['date'] = date
            res.send({err: null, msg: '验证码发送成功'})
        }).catch(() => {
            res.send({err: 'error', msg: '验证码发送失败'})
        })
    }
})

module.exports = router