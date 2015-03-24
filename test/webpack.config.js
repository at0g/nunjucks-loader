module.exports = {

    context: __dirname,

    entry: 'mocha!./web.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'index',
                query: {
                    config: __dirname + '/nunjucks.config.js'
                }
            }
        ]
    },

    resolve: {
        root: [
            __dirname,
            __dirname + '/fixtures/templates'
        ]
    },

    resolveLoader: {
        modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules', '../']
    }

};