# nunjucks-loader

This is a mono-repo managed with lerna that builds the nunjucks-loader.

If you just want to see the source code from the published module, it
 can be found here: [packages/nunjucks-loader]


# Installation and setup

The project must be bootstrapped with lerna before any of the examples
 will work. To do this, run the following commands.

```bash
git clone git@github.com:at0g/nunjucks-loader.git
cd nunjucks-loader
git checkout 3x
npm i
npm run lerna bootstrap
```

## Running the examples

Once the project has been setup, the examples can be run easily.

__browser example__
```
cd packages/nunjucks-loader-browser-example
npm start
open http://localhost:8080/webpack-dev-server
```

__html webpack plugin example__
```
cd packages/nunjucks-loader-html-plugin-example
npm start
open http://localhost:8080/webpack-dev-server
```
alternatively, run `npm run clean && npm run build`, then look at the
 generated .html file in the dist directory.