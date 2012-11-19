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

// spin.js options
var spin_opts = {
  lines: 11,
  length: 0,
  width: 4,
  radius: 10,
  corners: 1,
  rotate: 0,
  color: '#000',
  speed: 1.2,
  trail: 33,
  shadow: false,
  hwaccel: false,
  className: 'spinner',
  zIndex: 2e9,
  top: 'auto',
  left: 'auto'
};
