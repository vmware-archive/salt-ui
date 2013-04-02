/**
All saltui configuration files

@module saltui.conf
**/
define(function(require) {
    'use strict';

    var configs = {
        polyfills:      require('conf/polyfills'),
        shims:          require('conf/shims'),
        routes:         require('conf/routes'),
        rivets:         require('conf/rivets'),
    };

    return configs;
});
