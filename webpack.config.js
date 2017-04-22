const path = require('path');

module.exports = {
    entry: './app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist')
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [path.resolve(__dirname, 'app')],
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    }
};
