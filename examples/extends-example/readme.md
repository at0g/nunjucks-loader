# Extends example.

This example is a simple implementation of a child template inheriting from a parent (using a relative path). 

To run this example:

- change `cwd` to this directory
- `npm install`
- `webpack-dev-server`
- open [http://localhost:8080]


## Files of note

- `webpack.config.js` registers the nunjucks loader
- `entry.js` includes child.nunj and renders the content in the browser
- `child.nunj` A simple template that extends `parent.nunj`