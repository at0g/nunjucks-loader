import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import slash from 'slash';

export default function parseNunjucks(source) {
	const options = loaderUtils.getOptions(this) || {};
	// this.cacheable();

    const str = source.toString();
	const result = nunjucks.renderString(str);

	console.log(arguments);

	return `
	module.exports = function() {
		return \`${result}\`;
	}
	`;
}