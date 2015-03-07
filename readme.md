# Nunjucks loader for webpack

- `require` precompiled templates in webpack
- supports `extends` and `include`
- resolves template dependencies using `require`
- bundles the nunjucks-slim browser runtime
- use the version of nunjucks you want to (peer dependency)

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Recommended configuration

Add it to webpack.config to process all .nunj and .nunjucks files:

``` javascript
// file: webpack.config.js

Install it `npm install nunjucks-loader --save`

Use it inline:

``` javascript
var tpl = require("nunjucks!./views/page.nunj");
var html = tpl.render({ message: 'Foo that!' });
```

or add it to webpack.config to process all .nunj and .nunjucks files:



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
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader'
            }
        ]
    }

};
```

Then use it in your module code without the `nunjucks!` prefix:

``` javascript
// file: src/entry.js
var tpl = require('./views/page.nunj');
var html = tpl.render({ message: 'Foo that!' });
```


### Adding custom filters and extensions

A custom nunjucks.Environment is used by this loader and can be retrieved like so:

``` javascript
var env = require('nunjucks-loader').env;
```

Provided you are **not using custom async filters or extensions**, you can add filters on this environment as is:

``` javascript
// file: src/entry.js
var env = require('nunjucks-loader').env;
env.addFilter('foo', function(input){
    return '[foo] ' + input;
});
```

If you **are using custom async filters and/or extensions**, you will need to do the following:

- Create a file to configure the environment. This should export a function that receives the nunjucks environment 
- Add the path to the configuration file to the loader config in webpack.config.js 

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
                test: /\.(nunj|nunjucks)$/,
                loader: 'nunjucks-loader',
                query: {
                    'config': __dirname + '/src/nunjucks.config.js'
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