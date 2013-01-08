/**
All saltui custom formatters

@module saltui.formatters
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');
    var formatters = {
        length:         require('formatters/length'),
    };

    // Register with rivets
    Object.keys(formatters).forEach(function(val) {
        rivets.formatters[val] = formatters[val];
    });

    return formatters;
});
