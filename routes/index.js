const router = require('koa-router')()

router.get('/', function *(next) {
    // this.body = 'Hello World@'
    yield next
})

module.exports = router