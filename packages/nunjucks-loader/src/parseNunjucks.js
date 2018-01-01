import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import slash from 'slash';

export default function parseNunjucks(source) {
	const options = loaderUtils.getOptions(this) || {};
	this.cacheable();

	return `
	module.exports = function() {
		return "${source}";
	}
	`;
}