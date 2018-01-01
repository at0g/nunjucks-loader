module.exports = {

    entry: './entry.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader'
            }
        ]
    }
};
