const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './utils/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var limits = '500M'
var upload = multer({ storage, limits })


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
router.post('/upload', upload.single('logo'), (req, res, next) => {
    console.log(req.file)
    let { size, mimetype, filename } = req.file
    let types = ['jpg', 'jpeg', 'png', 'gif']
    let mintype = mimetype.split('/')[1]
    if (size > 500 * 1024) {
        return res.send({ err: -1, msg: '上传文件太大'})
    } else if (types.indexOf(mintype) === -1) {
        return res.send({ err: -2, msg: '上传文件类型不符合 '})
    } else {
        let url = `/public/img/${filename}`
        res.send({ err: null, data: url })
    }
    // key 值 必须和前端保持统一
    // 'logo': 图片数据
})
  
//   router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//   })
  
//   var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//   router.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
//   })


module.exports = router