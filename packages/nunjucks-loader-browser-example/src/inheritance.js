const tpl = require('nunjucks-loader-templates/inheritance/child.njk');
const render = require('./render');

const data = [
    {},
    { message: 'hey there' },
];

render(data, tpl);