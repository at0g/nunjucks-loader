var $ = require('jquery');
//var env = require('nunjucks-loader/env');
//require('./nunjucks.config')(env);


var formTpl = require('markdown-form.nunj');
var resultTpl = require('markdown-result.nunj');

$(function(){
    $('body').html(  formTpl.render() );

    var $input = $('#md-input');
    var $result = $('#result');

    $('#markdown-form')
        .on('submit', function(evt){
            evt.preventDefault();
            $result.html( resultTpl.render({ content: $input.val() }) )
        })
        .trigger('submit')
    ;
});