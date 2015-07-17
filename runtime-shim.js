module.exports = function(nunjucks, env, obj, dependencies){

    var oldRoot = obj.root;
    obj.root = function( env, context, frame, runtime, cb ) {
        var oldGetTemplate = env.getTemplate;

        // The parentName param was added to nunjucks 1.3.x
        env.getTemplate = function( name, ec, parentName, cb ) {
            if( typeof ec === "function" ) {
                cb = ec;
                ec = false;
            }
            var _require = function(name) {
                try {
                    // add a reference to the already resolved dependency here
                    return dependencies[name];
                }
                catch (e) {
                    if ( frame.get( "_require" ) ) return frame.get( "_require" )( name )
                }
            };

            var tmpl = _require( name );
            frame.set( "_require", _require );
            if( ec ) tmpl.compile();
            cb( null, tmpl );
        };


        oldRoot( env, context, frame, runtime, function( err, res ) {
            env.getTemplate = oldGetTemplate;
            cb( err, res );
        });
    };

    var src = {
        obj: obj,
        type: 'code'
    };

    return new nunjucks.Template( src, env );

};