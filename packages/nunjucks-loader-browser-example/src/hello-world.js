const tpl = require('nunjucks-loader-templates/hello-world.njk');
const render = require('./render');

render([{}], tpl);