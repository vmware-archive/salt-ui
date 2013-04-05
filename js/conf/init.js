/**
All saltui configuration files

@module saltui.conf
**/
define(function(require) {
    'use strict';

    var configs = {
        routes:         require('conf/routes'),
        rivets:         require('conf/rivets'),
    };

    return configs;
});
