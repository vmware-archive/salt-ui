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
        elements: '../elements',
        formatters: '../formatters',
        mixins: '../mixins',
        models: '../models',
        utils: '../utils',
        tmpl: '../../tmpl',
    },
    // shim non-AMD libs
    shim: {
        'underscore': {exports: '_'},
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
    'mixins/init',
    'elements/init',
    ], function(conf) {
    'use strict';

    conf.routes.listen();
});
