var $ = require('jquery');
var helloTpl = require('./hello.nunj');

$(function(){
    $('body')
        .html( helloTpl.render() )
        .append( helloTpl.render({ message: 'there!'}) )
    ;

});