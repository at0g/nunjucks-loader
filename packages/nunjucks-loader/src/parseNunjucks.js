import path from 'path';
import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import parseDependencies from './parseDependencies';
import slash from 'slash';

let env;

const defaultEnvOptions = {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
};

// RegExp to match "require" as a nunjucks filter in the compiled template.
const requireFilterReg = /env\.getFilter\(\"require\"\)\.call\(context, \"(.*?)\"/g;

export default function parseNunjucks(source) {
    const loaderOpts = loaderUtils.getOptions(this) || {};
	const {
		options: webpackOpts,
		resourcePath,
	} = this;

	// Build the environment options
	const envOpts = {
        ...defaultEnvOptions,
        ...(loaderOpts.env || {}),
        web: undefined,
        express: undefined,
    };

	this.cacheable();

	if (!env) {
		env = new nunjucks.Environment([], envOpts);
	}

    const root = loaderOpts.root || webpackOpts.context;
    const contextRelativePath = path.relative(root, resourcePath);
    const key = slash(contextRelativePath);

	const nunjucksCompiledStr = nunjucks.precompileString(source, {
		env,
		name: key,
        asFunction: true,
	});

    const convertedCompiledStr = nunjucksCompiledStr
		// replace the window global with a nunjucks global
        .replace(/window\.nunjucksPrecompiled/g, 'nunjucks.nunjucksPrecompiled')
        // replace 'require' filter with a webpack require expression (to resolve assets)
		.replace(requireFilterReg, 'require("$1"');

	const templateDependencies = parseDependencies(convertedCompiledStr);
	const pathToShim = slash(path.resolve(this.context, __dirname + '/runtimeShim.js'));
    const output = `

var nunjucks = require("nunjucks/browser/nunjucks-slim.min");
var env;
if (!nunjucks.currentEnv) {
   env = nunjucks.currentEnv = new nunjucks.Environment([], ${JSON.stringify(envOpts)});
}
else {
   env = nunjucks.currentEnv;
}




// template dependencies
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});
${Object.keys(templateDependencies).map((templateName) => `
dependencies["${templateName}"] = require("${templateName}");`)}

// End template dependencies

var shim = require("${pathToShim}");



// compiled template str

${convertedCompiledStr}

// end compiled template str


module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["${key}"], dependencies);
    `;

    return output;
}