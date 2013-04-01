/**
 * RequireJS configuration
 */
requirejs.config({
    // By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    // except if the module ID starts with...
    paths: {
        binders: '../binders',
        conf: '../conf',
        crystals: '../crystals',
        elements: '../elements',
        formatters: '../formatters',
        models: '../models',
        transforms: '../transforms',
        utils: '../utils',

        fixtures: '../../fixtures',
        tmpl: '../../tmpl',
    },
    // shim non-AMD libs
    shim: {
        'd3': {exports: 'd3'},
    },
    // DEBUG: bust caches
    urlArgs: 'bust=' +  (new Date()).getTime(),
});

/**
Main salt-ui entry-point

Ensure all the init files have been loaded and start the routes listener

@module saltui
**/
requirejs([
    'conf/init',
    'binders/init',
    'formatters/init',
    'models/init',
    'elements/init',
    ], function(conf) {
    'use strict';

    conf.routes.listen();
});
