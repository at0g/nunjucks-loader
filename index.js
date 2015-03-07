/*******************************************************************
 *
 *  This module was heavily inspired by nunjucksify.
 *  (https://www.npmjs.com/package/nunjucksify)
 *
 *  Full credit to the original authors.
 *
 ******************************************************************/

var compiler = require('nunjucks/src/compiler');
var Environment = require('nunjucks/src/environment').Environment;
var env = new Environment([]);
var hasRun = false;

module.exports = function(source) {
    this.cacheable();

    if(!hasRun){
        var query = this.query.replace('?', '');
        if(query.length > 0){
            var q = JSON.parse(query);

            if(q.configure){
                var configure = require(q.configure);
                configure(env);
            }
        }
        hasRun = true;
    }

    var nunjucksCompiledStr = compiler.compile(source, env.asyncFilters, env.extensionsList);
    var reg = /env\.getTemplate\(\"(.*?)\"/g;
    var match;
    var required = {};
    var compiledTemplate = '';

    compiledTemplate += 'var nunjucks = require( "nunjucks/browser/nunjucks-slim" );\n';
    compiledTemplate += 'var env = require("' + __dirname + '/env");\n';
    // Add a dependencies object to hold resolved dependencies
    compiledTemplate += 'var dependencies = {};\n';

    while( match = reg.exec( nunjucksCompiledStr ) ) {
        var templateRef = match[1];
        if (!required[templateRef]) {
            // Require the dependency by name, so it get bundled in by webpack
            compiledTemplate += 'dependencies["' + templateRef + '"] = require( "' + templateRef + '" );\n';
            required[templateRef] = true;
        }
    }
    compiledTemplate += '\n\n\n\n';
    compiledTemplate += 'var shim = require("' + __dirname + '/runtime-shim' + '");\n';
    compiledTemplate += 'var obj = (function () {' + nunjucksCompiledStr + '})();\n';
    compiledTemplate += 'module.exports = shim(nunjucks, env, obj, dependencies)';

    return compiledTemplate;
};