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
        'rivets': {exports: 'rivets'},
    },
    // DEBUG: bust caches
    urlArgs: 'bust=' +  (new Date()).getTime(),
});

/**
Main salt-ui entry-point

@module saltui
**/
requirejs([
    'text!tmpl/index.html',
    'domReady!',
    'path',
    'binders/init',
    'conf/init',
    'elements/init',
    'formatters/init',
    'mixins/init',
    'models/init',
    ], function(template, document, Path) {
        'use strict';

        Path.map('#/').to(function(){
            document.querySelector('body').innerHTML = template;
        });

        Path.root('#/');

        Path.listen();

        return null;
    }
);
