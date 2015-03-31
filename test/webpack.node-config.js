module.exports = {

    target: 'node',

    context: __dirname,

    output: {
        libraryTarget: 'commonjs2'
    },

    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'index',
                query: {
                    config: __dirname + '/nunjucks.config.js'
                }
            },
            {
                test: /\.node$/,
                loader: 'node'
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