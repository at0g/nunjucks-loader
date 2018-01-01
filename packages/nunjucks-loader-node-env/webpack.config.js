const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	externals: [
		nodeExternals({
			// load non-javascript files with extensions, presumably via loaders
			whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
		}),
	],
	module: {
		rules: [
			{
				test: /\.njk$/,
				use: [
					{
						loader: 'nunjucks-loader',
						options: {
							pathToConfigure: path.join(__dirname, 'src/configureTemplate.js'),
						},
					},
				],
			},
		],
	},
};