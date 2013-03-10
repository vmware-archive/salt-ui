/**
All saltui custom formatters

@module saltui.formatters
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');

    var formatters = {
        array:              require('./array'),
        length:             require('./length'),
        sortById:           require('./sortById'),
    };

    // Register with rivets
    Object.keys(formatters).forEach(function(val) {
        rivets.formatters[val] = formatters[val];
    });

    return formatters;
});
