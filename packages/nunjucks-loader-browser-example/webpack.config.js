const path = require('path');

module.exports = {

    entry: {
        'hello-world': './src/hello-world.js',
        inheritance: './src/inheritance.js',
    },

    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: 'nunjucks-loader',
                        options: {
                            root: path.join(__dirname, 'src', 'templates'),
                        },
                    },
                ],
            },
        ],
    },
};
