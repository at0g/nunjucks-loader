# Nunjucks loader for webpack

- `require` precompiled templates in webpack
- supports `extends` and `include`
- resolves template dependencies using `require`
- bundles the nunjucks-slim browser runtime
- use the version of nunjucks you want to (peer dependency)

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Recommended configuration

Install: `npm install nunjucks-loader --save`


Add to webpack.config to process all .nunj and .nunjucks files:

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

#### Inline configuration (not recommended)

If using the inline configuration (below), references inside of templates to other files (parents, imports etc) may not
resolve correctly - hence it's preferable to use the webpack.config method above.

``` javascript
var tpl = require("nunjucks!./views/page.nunj");
var html = tpl.render({ message: 'Foo that!' });
```


### webpack.target = 'node'

When targeting node instead of the browser, you'll need to add the following lines to your config.

``` javascript
// file: webpack.config.js
module.exports = {
    target: 'node',
    output: {
        libraryTarget: 'commonjs2',
        ...
    },
    ...
}

```

If you intend to bundle nunjucks in the output, you will also need to add the node-loader module and exclude the
 minimatch module.

``` javascript
// file: webpack.config.js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.node$/,
                loader: 'node'
            },
            {
                test: /minimatch/,
                loader: 'imports?require=>false'
            }
            ...
        ]
    }
}
```



### Adding custom filters and extensions

A custom nunjucks.Environment is used by this loader. To configure the nunjucks environment:

- Create a file that will configure the environment. This should export a function that receives the nunjucks
 environment as its first argument.
- Add a `config` key to the nunjucks-loader query in webpack.config.js

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

## Tests

### Web

`npm run test`
Navigate to http://localhost:8080/test

### Node
`npm run test-node`