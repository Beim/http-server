const path = require('path')

module.exports = {
    context: path.join(__dirname, 'public/source'),
    entry: {
        bundle: './entry.jsx'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.(png|jpg)/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png'
                }
            },
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
