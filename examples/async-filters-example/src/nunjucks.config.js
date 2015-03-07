var marked = require('marked');


module.exports = function(env){

    env.addFilter('markdown', function(input, done){
        marked(input, function(err, content){
            done(err, content);
        });
    }, true);
};