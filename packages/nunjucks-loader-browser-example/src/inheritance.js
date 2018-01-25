import tpl from 'nunjucks-loader-templates/inheritance/child.njk';
import render from './render';

const data = [
    {},
    { message: 'hey there' },
];

render(data, tpl);