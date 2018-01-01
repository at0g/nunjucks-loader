var $ = require('jquery');
var helloTpl = require('./hello.njk');

$(function(){
    $('body')
        .html( helloTpl.render() )
        .append( helloTpl.render({ message: 'there!'}) )
    ;

});