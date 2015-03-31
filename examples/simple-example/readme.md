# Simple template example.

This example simply compiles a hello world template and runs it in the browser.

To run this example:

- change `cwd` to this directory
- `npm install`
- `webpack-dev-server`
- open [http://localhost:8080]


## Files of note

- `webpack.config.js` registers the nunjucks loader
- `entry.js` includes hello.nunj and renders the content in the browser
- `hello.nunj` A simple template