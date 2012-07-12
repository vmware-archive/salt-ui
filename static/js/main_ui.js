require.config({
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

// Init the Bootstrap carousel
require(function(require){
    var $ = require('jquery'),
        bootstrap = require('bootstrap');

    $(document).ready(function(){
        $('.hero-unit .carousel').carousel({
            interval: 2000
        });
    });
});

// Init main backbone app
require(function(require){
    var $ = require('jquery'),
        SSorgRouter = require('router');

    $(document).ready(function(){
        new SSorgRouter();
        Backbone.history.start({pushState: true});
    });
});
