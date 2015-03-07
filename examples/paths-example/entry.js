var $ = require('jquery');
var tpl = require('child.nunj');

$(function(){
    $('body')
        .html( tpl.render({ message: 'Hello!'}) )
    ;
});