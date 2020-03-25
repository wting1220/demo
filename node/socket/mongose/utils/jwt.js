const jwt = require('jsonwebtoken')
const secret = 'gjhklxcvbnm,,ghjklcvbn'

function createToken(payload) {
    payload.ctime = Date.now()
    return jwt.sign(payload, secret)
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            err ? reject('token 校验失败') : resolve(data)
        })
    })
}

module.exports = { createToken, verifyToken }