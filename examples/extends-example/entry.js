var $ = require('jquery');
var tpl = require('./child.nunj');

$(function(){
    $('body')
        .html( tpl.render() )
        .append('<hr>')
        .append( tpl.render({ message: 'Hello!'}) )
    ;
});