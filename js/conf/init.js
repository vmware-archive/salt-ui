/**
All saltui configuration files

@module saltui.conf
**/
define(function(require) {
    'use strict';

    var configs = {
        polyfills:      require('conf/polyfills'),
        rivets:         require('conf/rivets'),
        templates:      require('conf/templates'),
    };

    return configs;
});
