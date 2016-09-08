const router = require('koa-router')()
const util = require('./apiv0/util.js')
const querystring = require('querystring')

/**
 * 获取路径下的文件列表
 */
router.get('/path', function *() {
    let path = this.query.p
    let body = yield util.getDirInfo(path) 
    this.body = JSON.stringify(body, null, 4)
})

/**
 * 获取文件
 */
router.get('/source', function *() {
    let filename = util.parseFileName(this.query.p)
    filename = querystring.escape(filename)
    this.set({'Content-Disposition': `filename=${filename}`})
    this.body = yield util.getFile(this.query.p)
})

module.exports = router