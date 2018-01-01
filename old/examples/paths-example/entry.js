var $ = require('jquery');
var tpl = require('child.njk');

$(function(){
    $('body')
        .html( tpl.render({ message: 'Hello!'}) )
    ;
});