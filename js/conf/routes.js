/**
Description
**/
define(function(require) {
    'use strict';

    var router = require('utils/router'),
        route_map = Object.create(router);

    route_map.add('exec', {
        url: '#/exec',
        tmpl: require('text!tmpl/exec.html'),
        type: 'full',
    });

    route_map.add('login', {
        url: '#/login',
        tmpl: require('text!tmpl/login.html'),
        type: 'modal',
    });

    route_map.root(route_map.get_url('exec'));

    return route_map;
});
