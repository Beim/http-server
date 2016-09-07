const router = require('koa-router')()
const util = require('./apiv0/util.js')
const querystring = require('querystring')

router.get('/path', function *(next) {
    let path = this.query.p
    let body = yield util.getDirInfo(path) 
    this.body = JSON.stringify(body, null, 4)
})

router.get('/source', function *() {
    let filename = util.parseFileName(this.query.p)
    filename = querystring.escape(filename)
    this.set({'Content-Disposition': `filename=${filename}`})
    this.body = yield util.getFile(this.query.p)
})

module.exports = router