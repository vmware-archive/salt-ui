/**
All saltui custom formatters

@module saltui.formatters
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');

    var f = require('utils/func');

    var formatters = {
        array:              require('./array'),
        ifattr:             require('./ifattr'),
        keyval:             require('./keyval'),
        length:             require('./length'),
        not:                f.not,
        sortById:           require('./sortById'),
    };

    // Register with rivets
    Object.keys(formatters).forEach(function(val) {
        rivets.formatters[val] = formatters[val];
    });

    return formatters;
});
