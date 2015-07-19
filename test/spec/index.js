module.exports = function (lib) {

    require('./paths')(
        lib['./templates/child.nunj'],
        lib['child.nunj']
    );

    require('./inheritance')(
        lib['child.nunj']
    );

    require('./includes')(
        lib['include-basic.nunj'],
        lib['include-within-block.nunj']
    );

    require('./environment')(
        lib['global-value.nunj'],
        lib['standard-filter.nunj'],
        lib['async-filter.nunj']
    )
};
