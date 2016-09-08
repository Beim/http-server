const fs = require('fs')
    , Path = require('path')
    , CWD = process.cwd()


/**
 * 解析路径
 * 
 * @param {String} path
 * @return {String}
 * @api public
 */
const rsPath = (path) => {
    if (!path)
        return Path.resolve.bind(null, CWD)
    else 
        return Path.resolve.bind(null, CWD, path)
}

/**
 * 获取路径中最后的文件名
 * 
 * @param {String} p
 * @return {String}
 * @api public
 */
const parseFileName = (p) => {
    let arr = p.split('/')
    return arr[arr.length - 1]
}

/**
 * 获取文件列表
 * 
 * @param {String} path
 * @return {Object}
 * @api public
 */
const getDirInfo = (path) => {
    const getPath = rsPath(path)
    const result = {
        files: [],
        dirs: []
    }
    return new Promise((res, rej) => {
        fs.readdir(getPath(), (err, files) => {
            if (err) {
                return res({})
            }
            let ps = []
            for (let i of files) {
                ps.push(new Promise((res1, rej1) => {
                    let path = getPath(i)
                    fs.stat(path, (err, stats) => {
                        path = path.split(CWD)[1]
                        if (path) {
                            if (path[0] === '/') path = path.slice(1)
                            let parr = path.split('/')
                            let name = parr[parr.length - 1]
                            if (stats.isFile()) {
                                result.files.push({ type: 'file', path, name })
                            } else if (stats.isDirectory()) {
                                result.dirs.push({ type: 'dir', path, name })
                            }
                        }
                        res1()
                    })
                }))
            }
            Promise.all(ps).then(() => {
                result.files.sort((a, b) => {
                    return a.name > b.name
                })
                result.dirs.sort((a, b) => {
                    return a.name > b.name
                })
                res(result)
            })

        })
    })
}

/**
 * 获取文件
 * 
 * @param {String} path
 * @return {Object}
 * @api public
 */
const getFile = (path) => {
    return new Promise((res, rej) => {
        path = rsPath(path)()
        fs.stat(path, (err, stat) => {
            if (err) {
                res('File Not Found')
            } else {
                let stream = fs.createReadStream(path)
                res(stream)
            }
        })
    })
}

module.exports = {
    getDirInfo,
    getFile,
    rsPath,
    parseFileName
}