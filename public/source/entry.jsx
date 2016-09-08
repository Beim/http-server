import './style.css'
import './pure/grids-responsive-min.css'
import folderImg from './folder.png'
import backImg from './back.png'
import fileImg from './file.png'
import React from 'react'
import {render} from 'react-dom'
const rcc = React.createClass.bind()

const App = rcc({
    getInitialState() {
        return {
            path: ['/'],
            items: {
                files: [],
                dirs: []
            }
        }
    },
    componentDidMount() {
        this.updateItems()
    },
    /**
     * 转到对应路径，参数不包括/
     * @param {Array} e
     */
    goPath(e) {
        let pathArr = []
        if (e[0]) pathArr = e.slice(1)
        else pathArr = JSON.parse(e.target.attributes['data-path'].value)
        let pathStr = pathArr.join('/')
        this.updateItems(pathStr)
        this.setState({
            path: ['/'].concat(pathArr)
        })
    },
    /**
     * 进入目录
     * @param {String} path
     */
    goDir(path) {
        let pathArr = path.split('/')
        this.setState({
            path: ['/'].concat(pathArr)
        })
        this.updateItems(path)
    },
    /**
     * 更新目录下的文件
     * @param {String} pathStr
     */
    updateItems(pathStr = '') {
        let that = this
        let url = '/api/path?p=' + pathStr
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function(e){
            let items = JSON.parse(this.response)
            that.setState({items})
        } 
        xhr.send()
    },
    /**
     * 获取文件
     * @param {String} path
     */
    getFile(path) {
        let url = 'api/source?p=' + path
        window.location = url
    },
    /**
     * 返回上一级目录
     */
    getBack() {
        if (this.state.path.length > 1) {
            let e = this.state.path.slice(0, -1)
            console.log(e)
            this.goPath(e)
            // this.goPath(this.state.path.slice(1, -1))
        }
        // this.state.path.slice(1)
    },
    render() {
        let paths = this.state.path.map((value, index) => {
            return (
                <span className='path' key={'path' + index}
                    data-path={JSON.stringify(this.state.path.slice(1, index + 1))}
                    onClick={this.goPath}
                >
                    {value}
                </span>
            )
        })

        let dirs = this.state.items.dirs.map((value, index) => {
            return (
                <div key={'dirs' + index} className='block pure-u-sm-1-2 pure-u-md-1-4'>
                    <div className='box'>
                        <div className='box-pic' onClick={this.goDir.bind(this, value.path)}>
                            <img src={folderImg}/>
                        </div>
                        <div className='box-name'>{value.name}</div>
                    </div>
                </div>
            )
        })
        let files = this.state.items.files.map((value, index) => {
            return (
                <div key={'dirs' + index} className='block pure-u-sm-1-2 pure-u-md-1-4'>
                    <div className='box'>
                        <div className='box-pic' onClick={this.getFile.bind(this, value.path)}>
                            <img src={fileImg}/>
                        </div>
                        <div className='box-name'>{value.name}</div>
                    </div>
                </div>
            )
        })

        return (
            <div className='background'>
                <div className="container">
                    <div className="catalog">
                        {paths}
                    </div>
                    <div className='main pure-g'>
                        
                        <div className='block pure-u-sm-1-2 pure-u-md-1-4'>
                            <div className='box'>
                                <div className='box-pic' onClick={this.getBack}>
                                    <img src={backImg}/>
                                </div>
                                <div className='box-name'>..</div>
                            </div>
                        </div>
                        {dirs}
                        {files}
                    </div>
                </div>
            </div>
        )
    }
})

render(<App />, document.body)