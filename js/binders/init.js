/**
All saltui custom binders

@module saltui.binders
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');
    var binders = {
        'current-*':    require('binders/current'),
        input:          require('binders/input'),
    };

    // Register with rivets
    Object.keys(binders).forEach(function(val) {
        rivets.binders[val] = binders[val];
    });

    return binders;
});

