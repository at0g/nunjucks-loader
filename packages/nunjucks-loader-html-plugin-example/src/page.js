const tpl = require('nunjucks-loader-templates/page/page.njk');

module.exports = () => {
    return tpl.render();
};