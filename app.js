const app = require('koa')()
const koaRouter = require('koa-router')()
const path = require('path')
const serve = require('koa-static')

const routeOpts = require('./routes/config.json')
for (let key in routeOpts) {
    if (routeOpts.hasOwnProperty(key)) {
        let elem = require('./routes/' + routeOpts[key])
        koaRouter.use(key, elem.routes(), elem.allowedMethods())
    }
}
app.use(koaRouter.routes())
app.use(serve(path.resolve(__dirname, 'public')))

module.exports = app