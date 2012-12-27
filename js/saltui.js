/**
 * RequireJS configuration
 */
requirejs.config(
    // By default load any module IDs from js/lib
    { baseUrl: 'js/lib'
    // except if the module ID starts with...
    , paths:
        { binders: '../binders'
        , conf: '../conf'
        , elements: '../elements'
        , formatters: '../formatters'
        , models: '../models'
        , utils: '../utils'
        , tmpl: '../../tmpl'
        }
    // shim non-AMD libs
    , shim:
        { 'underscore': {exports: '_'}
        , 'rivets': {exports: 'rivets'}
        }
    // DEBUG: bust caches
    , urlArgs: 'bust=' +  (new Date()).getTime()
    }
);

/**
Main salt-ui entry-point

@module saltui
**/
requirejs(
    [ 'domReady!'
    , 'elements/main'
    , 'formatters/main'
    , 'binders/main'
    , 'conf/main'
    ],
    function(document) {
        'use strict';
        return null;
    }
);
