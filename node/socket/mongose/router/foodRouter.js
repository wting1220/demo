const express = require('express')
const router = express.Router()
const Food = require('../db/model/foodModel')

/**
 * @api {post} /food/add 添加
 * @apiName 添加
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} desc 描述.
 * @apiParam {Number} typeId 类id.
 * @apiParam {String} image 照片.
 *
 * @apiSuccess {String} err 错误.
 * @apiSuccess {String} msg 添加完成信息.
 */
router.post('/add', (req, res) => {
    // 获取数据
    let { name, price, desc, typeId, image } = req.body
    let typeName = ''
    if (name && price && desc && typeId && image) {
        switch (typeId) {
            case 2:
                typeName = '凉菜'
                break;
            case 3:
                typeName = '酒水'
                break;     
            default:
                typeName = '热菜'
                break;
        }
        Food.find({ name })
        .then((data) => {
            if (data.length > 0) {
                res.send({ err: null, msg: '菜品已存在' })
            } else {
                return Food.insertMany({ name, price, desc, typeName, typeId, image })
            }
        })
        .then(() => {
            res.send({ err: null, msg: '添加成功' })
        }).catch(() => {
            res.send({ err: null, msg: '添加失败' })
        })
    } else {
        return res.send({ err: null, msg: '数据不对' })
    }
    // 数据处理
    // 返回数据
})

/**
 * @api {post} /food/delete 删除指定唯一一个或者多个
 * @apiName 删除指定唯一一个或者多个
 * @apiGroup Food
 *
 * @apiParam {String} id 菜 id.
 *
 * @apiSuccess {String} err 错误.
 * @apiSuccess {String} msg 删除完成信息.
 */
router.post('/delete', (req, res) => {
    let { id } = req.body
    if (Array.isArray(id)) {
        Food.deleteMany({ _id: {$in: id} }).then(()=> {
            res.send({ err: null, msg: '删除成功' })
        }).catch(() => {
            res.send({ err: null, msg: '删除失败' })
        })
    } else {
        Food.deleteOne({ _id: id })
        .then(()=> {
            res.send({ err: null, msg: '删除成功' })
        })
        .catch(() => {
            res.send({ err: null, msg: '删除失败' })
        })
    }
})

/**
 * @api {get} /food/select?typeId=1 查询(不传参数默认查全部)
 * @apiName 查询
 * @apiGroup Food
 *
 * @apiParam {Number} typeId 类id.
 *
 * @apiSuccess {String} err 错误.
 * @apiSuccess {String} msg 查询完成信息.
 * @apiSuccess {Array} data 查询返回信息.
 * @apiSuccess {String} _id 菜 id.
 * @apiSuccess {String} name 菜名.
 * @apiSuccess {String} price 价格.
 * @apiSuccess {String} desc 描述.
 * @apiSuccess {String} typeName 类名.
 * @apiSuccess {Number} typeId 类id.
 * @apiSuccess {String} image 照片.
 * 
 */
router.get('/select', (req, res) => {
    let pageSize = +req.query.pageSize
    let page = +req.query.page
    let id = req.query.id
    let total = 0
    if (id !== undefined) {
        Food.find({ _id: id })
        .then((dataOne) => {
            if (dataOne.length > 0) {
                res.send({ err: null, data: dataOne })
            } else {
                res.send({ err: -1, msg: '暂无相关数据' })
            }
        })
        .catch(err => {
            res.send({ err: null, msg: err })
        })
    } else {
        Food.find().then((data) => { 
            total = data.length
            Food.find().limit(pageSize).skip(((page-1)*pageSize))
            .then((dataOne) => {
                if (dataOne.length > 0) {
                    res.send({ err: null, data: dataOne, total })
                } else {
                    res.send({ err: -1, msg: '暂无相关数据', total })
                }
            })
            .catch(err => {
                res.send({ err: 'error', msg: err })
            })
        })
    }
})

/**
 * @api {get} /food/select/keywords 模糊查询
 * @apiName 模糊查询
 * @apiGroup Food
 *
 * @apiParam {String} kw 关键字.
 *
 * @apiSuccess {String} err 错误.
 * @apiSuccess {String} msg 查询完成信息.
 * @apiSuccess {Array} data 查询返回信息.
 * @apiSuccess {String} _id 菜 id.
 * @apiSuccess {String} name 菜名.
 * @apiSuccess {String} price 价格.
 * @apiSuccess {String} desc 描述.
 * @apiSuccess {String} typeName 类名.
 * @apiSuccess {Number} typeId 类id.
 * @apiSuccess {String} image 照片.
 * 
 */
router.get('/select/keywords', (req, res) => {
    let { kw } = req.query
    let reg = new RegExp(kw)
    // 名字以及描述模糊，或者的关系
    Food.find({$or: [{name: {$regex: reg}}, {desc: {$regex: reg}}]})
    // Food.find({name: {$regex: reg}})
    .then(data => {
        if (data.length > 0) {
            res.send({ err: null, data })
        } else {
            res.send({ err: -1, msg: '暂无相关数据' })
        }
    })
    .catch(() => {
        res.send({ err: 'error', msg: '错误了' })
    })
})


/**
 * @api {post} /food/update 修改
 * @apiName 修改
 * @apiGroup Food
 * 
 * @apiParam {String} id _id.
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} desc 描述.
 * @apiParam {Number} typeId 类id.
 * @apiParam {String} image 照片.
 *
 * @apiSuccess {String} err 错误.
 * @apiSuccess {String} msg 修改完成信息.
 */
router.post('/update', (req, res) => {
    let { id, name, price, desc, typeId, image } = req.body
    let typeName = ''
    switch (typeId) {
        case 2:
            typeName = '凉菜'
            break;
        case 3:
            typeName = '酒水'
            break;     
        default:
            typeName = '热菜'
            break;
    }
    Food.updateOne({ _id: id }, { name, price, desc, typeName, typeId, image })
    .then(() => {
        res.send({ err: null, msg: '修改成功' })
    })
    .catch(() => {
        res.send({ err: 'error', msg: '修改失败' })
    })
})

module.exports = router