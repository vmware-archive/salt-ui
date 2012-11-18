requirejs.config({
    paths: {
        // Major libs
        jquery: 'libs/jquery.min',

        // Non-AMD libs (for use with shim)
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        bootstrap: 'libs/bootstrap.min',

        // Misc
        util: 'util',
        templates: '../templates',
        fixtures: 'fixtures/minion'
    },
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
    urlArgs: "bust=" +  (new Date()).getTime()
});

// Init main backbone app
requirejs(['jquery', 'router'], function($, SSorgRouter){
    $(document).ready(function(){
        new SSorgRouter();
        Backbone.history.start({pushState: true});
    });
});
