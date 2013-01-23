/**
Define URL routes and info for each, including which template to render when
that route is accessed by a client

@module saltui.conf
@submodule routes

@returns {Object} routes_map An object of route maps and helper functions to
query defined routes
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

    route_map.add('dash', {
        url: '#/dash',
        tmpl: require('text!tmpl/dash.html'),
        type: 'full',
    });

    route_map.add('login', {
        url: '#/login',
        tmpl: '<x-login></x-login>',
        type: 'modal',
    });

    route_map.root(route_map.get_url('exec'));

    return route_map;
});
