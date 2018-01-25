import template from 'nunjucks-loader-templates/inheritance/child.njk';

console.log('run js');

const el = document.createElement('div');
el.innerHTML = template.render();
document.body.appendChild(el);