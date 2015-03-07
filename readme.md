# Nunjucks loader for webpack

- `require` precompiled templates in webpack
- supports `extends` and `include`
- resolves template dependencies using `require`
- bundles the nunjucks-slim browser runtime
- use the version of nunjucks you want to (peer dependency)

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)


Install it `npm install nunjucks-loader --save`

Use it inline:

``` javascript
var tpl = require("nunjucks!./views/page.nunj");
var html = tpl.render({ message: 'Foo that!' });
```

or add it to webpack.config to process all .nunj and .nunjucks files:

**webpack.config.js**

``` javascript
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
var tpl = require('./views/page.nunj');
var html = tpl.render({ message: 'Foo that!' });
```


## Path resolution

This loader modifies the way nunjucks resolves dependencies (eg `extends`, `import` and `include`) to work correctly 
with webpack. As a result, you may use `require` style relative paths in your templates.
Add a `resolve.root` key to `webpack.config.js` to resolve your templates without using relative paths.

**webpack.config.js***

``` javascript
module.exports = {
    resolve: {
        root: [
            __dirname,
            __dirname + '/src/views'    // Resolve templates to ./src/views
        ]
    }
}
```