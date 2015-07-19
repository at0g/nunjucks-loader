module.exports = {

    target: 'web',

    context: __dirname,

    entry: 'mocha!./web.js',

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
            __dirname + '/fixtures/templates',
            __dirname + '/fixtures/custom_modules'
        ]
    },

    resolveLoader: {
        modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules', '../']
    }

};