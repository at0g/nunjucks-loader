module.exports = {

    entry: './src/entry.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    config: __dirname + '/src/nunjucks.config.js'
                }
            }
        ]
    },

    resolve: {
        root: [
            __dirname,
            __dirname + '/views',
        ]
    }
};
