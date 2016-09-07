#!/usr/bin/env node

const app = require('../app')
const http = require('http')

const port = process.env.PORT || 2333
const server = http.createServer(app.callback())
server.listen(port)