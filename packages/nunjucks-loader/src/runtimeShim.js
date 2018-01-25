module.exports = function runtimeShim(nunjucks, env, obj, dependencies) {
    const oldRoot = obj.root;

    obj.root = function(env, context, frame, runtime, ignoreMissing, cb) {
        const oldGetTemplate = env.getTemplate;
        env.getTemplate = function(name, ec, parentName, ignoreMissing, cb) {
            if( typeof ec === "function" ) {
                cb = ec = false;
            }
            const _require = function (name) {
                try {
                    // add a reference to the already resolved dependency here
                    return dependencies[name];
                }
                catch (e) {
                    if (frame.get("_require")) {
                        return frame.get("_require")(name);
                    }
                    else {
                        console.warn('Could not load template "%s"', name);
                    }
                }
            };

            const tmpl = _require(name);
            frame.set("_require", _require);

            if( ec ) tmpl.compile();
            cb( null, tmpl );
        };

        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {
            env.getTemplate = oldGetTemplate;
            cb( err, res );
        });
    };

    const src = {
        obj: obj,
        type: 'code'
    };

    return new nunjucks.Template(src, env);
};