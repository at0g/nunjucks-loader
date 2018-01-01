var $ = require('jquery');
var tpl = require('./child.njk');

$(function(){
    $('body')
        .html( tpl.render() )
        .append('<hr>')
        .append( tpl.render({ message: 'Hello!'}) )
    ;
});