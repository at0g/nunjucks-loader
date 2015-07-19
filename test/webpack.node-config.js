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
            },
            {
                test: /minimatch/,
                loader: 'imports?require=>false'
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