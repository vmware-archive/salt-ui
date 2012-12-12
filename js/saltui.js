requirejs.config({
    // By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    // except if the module ID starts with 'saltui'
    paths: {
        saltui: '../saltui'
    },
    // shim non-AMD libs
    shim: {
        'underscore': {exports: '_'},
        'angular': {exports: 'angular'},
        'angular-resource': ['angular'],
        'bootstrap': ['jquery']
    },
    // DEBUG: bust caches
    urlArgs: "bust=" +  (new Date()).getTime()
});

/**
 * Set up routes.
 * In addition grab any user-defined routes. This allows code defined outside
 * the saltui app to be dynamically loaded and injected.
 *
 */
requirejs([
            'saltui/main',
            'angular',
            'saltui/controllers/execution'
            // 'http://localhost:8000/routes?callback=define'
    ], function(saltui, angular, ExecutionCtrl, extraRoutes) {
    'use strict';

    saltui.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: ExecutionCtrl,
            templateUrl: '/partials/execution.html'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);
});
