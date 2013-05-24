/**
 * RequireJS configuration
 */
;(function() {
    var config = {
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
            shims: '../shims',
            transforms: '../transforms',
            utils: '../utils',
            viewmodels: '../viewmodels',

            fixtures: '../../fixtures',
            tmpl: '../../tmpl',
        },
        // shim non-AMD libs
        shim: {
            'd3': {exports: 'd3'},
            'path': {exports: 'Path'},
        },
        // DEBUG: bust caches
        urlArgs: 'bust=' +  (new Date()).getTime(),
    };

    // If demo=true is in the query string swap out the xhr backend for a
    // local-only fixtures-based stub
    if (window.location.search.indexOf('demo=true') !== -1) {
        config.map = {
            '*': {
                'utils/xhr': 'utils/fixtures',
            },
        };
    }

    requirejs.config(config);
})();

/**
Main salt-ui entry-point

Load shims first then load all the init files. Finally start the routes
listener.

@module saltui
**/
requirejs([
    'conf/init',

    'document.register',
    'shims/dataset',
    'shims/string',
    'shims/supplant',

    'binders/init',
    'formatters/init',
    'models/init',
    'elements/init',
    ], function(conf) {
    'use strict';

    conf.routes.listen();
});
