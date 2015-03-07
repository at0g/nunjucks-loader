module.exports = {

    entry: './entry.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader'
            }
        ]
    },

    resolve: {
        root: [
            __dirname,
            __dirname + '/another/template/path',
            __dirname + '/path/to/templates'
        ]
    }
};
