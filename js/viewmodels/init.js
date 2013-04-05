/**
Description
**/
define(function(require) {
    'use strict';

    var vms = {
        exec:       require('./exec'),
        login:      require('./login'),
        minions:    require('./minions'),
        nav:        require('./nav'),
    };

    return vms;
});
