# Nunjucks loader for webpack

- `require` precompiled templates in webpack
- supports `extends` and `include`
- resolves template dependencies using `require`
- bundles the nunjucks-slim browser runtime
- use the version of nunjucks you want to as a peer dependency
- supports experimental Jinja compatibility

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Recommended configuration

Install: `npm install nunjucks-loader --save`

Add to webpack.config to process all .njk and .nunjucks files:

``` javascript
// file: webpack.config.js
module.exports = {

    entry: './src/entry.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader'
            }
        ]
    }

};
```

Then use it in your module code without the `nunjucks!` prefix:

``` javascript
// file: src/entry.js
var tpl = require('./views/page.njk');
var html = tpl.render({ message: 'Foo that!' });
```

#### Inline configuration (not recommended)

If using the inline configuration (below), references inside of templates to other files (parents, imports etc) may not
resolve correctly - hence it's preferable to use the webpack.config method above.

``` javascript
var tpl = require("nunjucks!./views/page.njk");
var html = tpl.render({ message: 'Foo that!' });
```


### webpack.target = 'node'

**The 2.x versions of this loader do not support node/UMD bundles.**

If you need to support node or UMD with the bundle, the 1.x version (`npm install nunjucks-loader@1.0.7`) supports these
 targets.



### Filters and extensions

A *require* filter is added by this package that allows you to use webpack to resolve file references.
Eg.

```
{# use the raw-loader to replace 'readme.txt' with the contents of that file #}
{{ 'raw!readme.txt' | require }}
```


A custom nunjucks.Environment is used by the loader, to configure the nunjucks environment:

- To pass [nunjucks.Environment options](https://mozilla.github.io/nunjucks/api.html#environment), add a `opts` key to
 the nunjucks loader query in webpack.config.js
- Create a file that will configure the environment. This should export a function that receives the nunjucks
 environment as its first argument.
- Add a `config` key to the nunjucks-loader query in webpack.config.js
- Add an optional `quiet` key to the loader query in webpack.config.js to suppress precompile warnings (see below)

``` javascript
// file: src/nunjucks.config.js
module.exports = function(env){
    
    env.addFilter('asyncFoo', function(input, done){
        setTimeout(function(){
            done('[asyncFoo] ' + input);
        }, 1000)
    }, true);
    
    // env.addExtension(...) etc
}

// file: webpack.config.js
module.exports = {

    entry: './src/entry.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    config: __dirname + '/src/nunjucks.config.js'
                }
            }
        ]
    }
};

```

__If using async filters or custom extensions with nunjucks__, they must be available before the template is precompiled.
 If the nunjucks config file depends on webpack resolve (such as loaders or custom module paths), the custom
 filters/extensions will not be available at precompile time. When/if this happens, you will receive the following
 warning in the console:

*Cannot configure nunjucks environment before precompile*

When using webpack resolve with the environment config and __not__ using async filters or custom extensions, the warning
 can be safely ignored - standard filters are still added to the environment at runtime.

To remove the warning, pass the `quiet` option in the loader query. eg:

```
// file: webpack.config.js
module.exports = {

    module: {
        loaders: [
            {
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    config: __dirname + '/src/nunjucks.config.js',
                    quiet: true // Don't show the 'Cannot configure nunjucks environment before precompile' warning
                }
            }
        ]
    }
};
```




## Path resolution

This loader modifies the way nunjucks resolves dependencies (eg `extends`, `import` and `include`) to work correctly 
with webpack. As a result, you may use `require` style relative paths in your templates.
Add a `resolve.root` key to `webpack.config.js` to resolve your templates without using relative paths.


``` javascript
// file: webpack.config.js
module.exports = {
    resolve: {
        root: [
            __dirname,
            __dirname + '/src/views'    // Resolve templates to ./src/views
        ]
    }
}
```

Alternatively, a `root` query parameter can be passed to the loader to set the root template directory.

``` javascript
// webpack.config.js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    root: __dirname + '/path/to/templates'
                }
            }
        ]
    }
}
```


## Jinja/Python compatibility

If [experimental support for Jinja compatibility](https://mozilla.github.io/nunjucks/api.html#installjinjacompat)
is desired, pass the jinjaCompat option in the loader query. eg:

```
// file: webpack.config.js
module.exports = {

    module: {
        loaders: [
            {
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    jinjaCompat: true
                }
            }
        ]
    }
};
```

This option will not provide full Jinja/Python compatibility, but will treat `True`/`False` like `true`/`false`, and
augment arrays and objects with Python-style methods (such as `count`, `find`, `insert`, `get`, and `update`).
Review the [jinja-compat source](https://github.com/mozilla/nunjucks/blob/master/src/jinja-compat.js) to see
everything it adds.




## Tests

`npm run test`
Navigate to http://localhost:8080/test
