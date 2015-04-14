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
var slash = require('slash')
var env = new Environment([]);
var hasRun = false;
var pathToConfigure;

module.exports = function(source) {
    this.cacheable();

    if(!hasRun){
        var query = this.query.replace('?', '');
        if(query.length > 0){
            var q = JSON.parse(query);

            if(q.config){
                pathToConfigure = q.config;
                var configure = require(q.config);
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

    if (this.target === 'web') {
        compiledTemplate += 'var nunjucks = require( "nunjucks/browser/nunjucks-slim" );\n';
    }
    else {
        compiledTemplate += 'var nunjucks = require("nunjucks");\n';
    }

    compiledTemplate += 'var env = new nunjucks.Environment([]);\n';
    // Add a dependencies object to hold resolved dependencies
    compiledTemplate += 'var dependencies = {};\n';

    if( pathToConfigure ){
        compiledTemplate += 'var configure = require("' + pathToConfigure + '")(env);\n';
    }

    while( match = reg.exec( nunjucksCompiledStr ) ) {
        var templateRef = match[1];
        if (!required[templateRef]) {
            // Require the dependency by name, so it get bundled by webpack
            compiledTemplate += 'dependencies["' + templateRef + '"] = require( "' + templateRef + '" );\n';
            required[templateRef] = true;
        }
    }
    compiledTemplate += '\n\n\n\n';
    compiledTemplate += 'var shim = require("' + slash(__dirname + '/runtime-shim') + '");\n';
    compiledTemplate += 'var obj = (function () {' + nunjucksCompiledStr + '})();\n';
    compiledTemplate += 'module.exports = shim(nunjucks, env, obj, dependencies)';

    return compiledTemplate;
};
