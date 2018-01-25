const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: 'nunjucks-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: '!!nunjucks-loader!src/templates/page.njk'
    })],
};