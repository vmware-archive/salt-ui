requirejs.config({
    // By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    // except if the module ID starts with 'app'
    paths: {
        app: '../app'
    },
    // shim non-AMD libs
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery.bootstrap'
        }
    },
    // DEBUG: bust caches
    urlArgs: "bust=" +  (new Date()).getTime()
});

// Init main backbone app
requirejs(['jquery', 'app/router'], function($, SSorgRouter){
    $(document).ready(function(){
        new SSorgRouter();
        Backbone.history.start({pushState: true});
    });
});
