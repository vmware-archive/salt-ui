/**
Description
**/
define(function(require) {
    'use strict';

    var vms = {
        config:     require('./config'),
        exec:       require('./exec'),
        keys:       require('./keys'),
        login:      require('./login'),
        minions:    require('./minions'),
        nav:        require('./nav'),
    };

    return vms;
});
