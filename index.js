/*******************************************************************
 *
 *  The majority of this module is based on nunjucksify.
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
    compiledTemplate += 'var obj = (function () {' + nunjucksCompiledStr + '})();\n';
    compiledTemplate += 'var oldRoot = obj.root;\n';
    compiledTemplate += 'obj.root = function( env, context, frame, runtime, cb ) {\n';
    compiledTemplate += '	var oldGetTemplate = env.getTemplate;\n';
    compiledTemplate += '	env.getTemplate = function( name, ec, cb ) {\n';
    compiledTemplate += '		if( typeof ec === "function" ) {\n';
    compiledTemplate += '			cb = ec;\n';
    compiledTemplate += '			ec = false;\n';
    compiledTemplate += '		}\n';

    compiledTemplate += '		var _require = function(name) {\n';
    compiledTemplate += '			try {\n';

                                        // add a reference to the already resolved dependency here...
    compiledTemplate += '				return dependencies[name];\n';
    compiledTemplate += '			} catch (e) {\n';
    compiledTemplate += '				if ( frame.get( "_require" ) ) return frame.get( "_require" )( name )\n';
    compiledTemplate += '			}\n';
    compiledTemplate += '		};\n';
    compiledTemplate += '		var tmpl = _require( name );\n';
    compiledTemplate += '		frame.set( "_require", _require );\n';
    compiledTemplate += '		if( ec ) tmpl.compile();\n';
    compiledTemplate += '		cb( null, tmpl );\n';
    compiledTemplate += '	};';

    compiledTemplate += '	oldRoot( env, context, frame, runtime, function( err, res ) {\n';
    compiledTemplate += '		env.getTemplate = oldGetTemplate;\n';
    compiledTemplate += '		cb( err, res );\n';
    compiledTemplate += '	} );\n';
    compiledTemplate += '};\n';

    compiledTemplate += 'var src = {\n';
    compiledTemplate += '	obj: obj,\n';
    compiledTemplate += '	type: "code"\n';
    compiledTemplate += '};\n';

    compiledTemplate += 'module.exports = new nunjucks.Template( src, env );\n';

    return compiledTemplate;
}